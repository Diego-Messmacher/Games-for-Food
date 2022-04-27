#app.rb

require 'sinatra'
require 'sinatra/cross_origin'
require 'sinatra/activerecord'
require './models.rb'
require 'date'
require 'json'
require 'bcrypt'

require_relative 'helpers/helpers.rb'

set :database, {adapter: "mysql2", database:"gamesforfood2020", username:"gffdb", password:"#20FreeHinkMessCutSulk20$"}

def current_user
  if session[:GffUser]
    if !GffUser.find(session[:GffUser])
      redirect "/"
    else
      @current_user = GffUser.find(session[:GffUser])
    end
  end
end

###USE TO SAVE GAME DATA TO DATABASE###
def savegame(userID, gameName, gameScore)
  #get game id from db
  currGame = GffGame.find_by(name: gameName)
  if currGame #we found the game
    #get the gamestat for this use in this game
    gamestat = GffGamestat.where(gffuser_id: userID, gffgame_id: currGame.id)
    if !gamestat.empty?
      count = gamestat[0].playcount + 1 #they've played one more time
      #if they beat their personal best save it!

      #colorwayz scores get SMALLER, not larger. Deal with it
      betterScore = false
      if gameName.include?('Color')
        betterScore = gameScore < gamestat[0].bestscore
      else
        betterScore = gameScore > gamestat[0].bestscore
      end

      if betterScore
        gamestat[0].update(bestscore: gameScore, playcount: count)
      else #only update the playcount
        gamestat[0].update(playcount: count)
      end
    else #no score previously saved
      GffGamestat.create(bestscore: gameScore, playcount: 1, gffuser_id: userID, gffgame_id: currGame.id)
    end

    ####CHECK AGAINST ALL-TIME HIGH SCORES AND UPDATE IF NECESSARY####
    highscore = GffHighscore.find_by(gffgame_id: currGame.id)
    if highscore
      puts "OLD VS NEW: " + highscore.score + " vs " + gameScore.to_s
      #if they beat their personal best save it!

      betterScore = false
      if gameName.include?('Color')
        betterScore = gameScore < highscore.score.to_i
      else
        betterScore = gameScore > highscore.score.to_i
      end

      if betterScore
        puts "NEW HIGH SCORE!"
        highscore.update(score: gameScore, create_at: DateTime.now, gffuser_id: userID)
      end
    else # no high score recorded
      puts "NO HIGH SCORE RECORDED. MAKING ONE!"
      GffHighscore.create(score: gameScore, create_at: DateTime.now, gffuser_id: userID, gffgame_id: currGame.id)
    end
  else
    puts "ERROR: NO GAME FOUND"
  end
end


class GamesForFoodApp < Sinatra::Base

  use Rack::Session::Cookie, :key => 'rack.session', :path => '/', :secret => 'jakesucks'
  use Rack::Session::Pool, :expire_after => 2592000

  configure do
    enable :cross_origin
  end

  before do
    response.headers['Access-Control-Allow-Origin'] = "*";
  end

  options "*" do
    response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end

  get '/' do
    current_user

    allHighs = GffHighscore.all
    allHighs.each do |highscore|
      currGame = GffGame.find(highscore.gffgame_id)
      currGameName = currGame.name.split[0].strip

      highScoreData = Hash.new
      highScoreData['score'] = highscore.score
      highScoreData['username'] = GffUser.find(highscore.gffuser_id).username.split('@')[0].strip
      highScoreData['created_at'] = highscore.create_at
      instance_variable_set("@highscore#{currGameName}", highScoreData)
    end

    erb :index
  end

  get '/about' do
    current_user
    erb :about
  end

  get '/login' do
    erb :login
  end

  get '/profile' do
    current_user
    allGames = GffGame.all

    #for each game, generate a variable (from the first word of the game name)
    #that contains the Gamestat for that game, which is used in the profil.erb
    allGames.each do |game|
      gameName = game.name.split[0].strip
      instance_variable_set("@gamestat#{gameName}", GffGamestat.where(gffuser_id: @current_user.id, gffgame_id: game.id))
      if !instance_variable_get("@gamestat#{gameName}").empty?
        instance_variable_set("@gamestat#{gameName}", instance_variable_get("@gamestat#{gameName}")[0])
      else
        instance_variable_set("@gamestat#{gameName}", nil)
      end
    end

    #for each game, find the all-time high score and load it into variables
    allHighs = GffHighscore.all
    allHighs.each do |highscore|
      currGame = GffGame.find(highscore.gffgame_id)
      currGameName = currGame.name.split[0].strip

      highScoreData = Hash.new
      highScoreData['score'] = highscore.score
      highScoreData['username'] = GffUser.find(highscore.gffuser_id).username.split('@')[0].strip
      highScoreData['created_at'] = highscore.create_at
      instance_variable_set("@highscore#{currGameName}", highScoreData)
    end

    erb :profile
  end

  get '/colorwayz' do
    current_user
    erb :colorwayz, :layout => :gamelayout
  end

  post '/savecolor14' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number
    puts "GAME NAME: " + game
    savegame(@current_user.id, game, score)
  end


  post '/savecolor22' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  post '/savecolor30' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  post '/savecolor38' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end


  post '/savecolor46' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  post '/savecolor54' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  get '/jump' do
    current_user
    erb :jump, :layout => :gamelayout
  end

  post '/savejump' do
    current_user
    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  get '/snake' do
    current_user
    erb :snake, :layout => :gamelayout
  end

  post '/savesnake' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  get '/jimbo' do
    current_user
    erb :jimbo, :layout => :gamelayout
  end

  post '/savejimbo' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  get '/fillitin' do
    current_user
    erb :fillitin, :layout => :gamelayout
  end

  post '/savefill' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  get '/rocket' do
    current_user
    erb :rocketdodger, :layout => :gamelayout
  end

  post '/saverocket' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end

  get '/breakout' do
    current_user
    erb :breakout, :layout => :gamelayout
  end


  post '/savebreakout' do
    current_user

    #get game data from game post - format is text in the folowing format -> "Game Name,score"
    payload = request.body.read
    payload = payload.split(',')

    #clean off any extra whitespace from ends
    game = payload[0].strip
    score = payload[1].strip.to_i #score should be a number

    savegame(@current_user.id, game, score)
  end


  get '/logout' do
    puts  "LOGGED OUT"
    session.clear
    redirect "/"
  end


  post '/signup' do
    @user = GffUser.find_by(username:  params[:email])
    if @user.blank? #new user
      time = DateTime.now
      hashed_pwd = BCrypt::Password.create(params[:pwd])
      GffUser.create(username: params[:email], password: hashed_pwd.to_s , create_at: time)
      redirect "/"
    else #username already in use
        session[:err] = "Username already exists! Try logging in instead!"
        puts "ERROR MSG: " + session[:err].to_s
        redirect "/login"
    end
  end

  post '/login_process' do
    @user = GffUser.find_by(username:  params[:email])
    if !@user.blank?
      puts "USER ATTEMPT: " + @user.username.to_s
      hashed_check = BCrypt::Password.new(@user.password)
      if hashed_check == params[:psw]
        session[:GffUser] = @user.id
        session.delete(:err)
      else
        session[:err] = "Username/Password did not match!"
        puts "ERROR MSG: " + session[:err].to_s
        redirect "/login"
      end
    else
        session[:err] = "Failed to find username! Are you sure you signed up?"
        puts "ERROR MSG: " + session[:err].to_s
        redirect "/login"
    end
    redirect "/"
  end

  get '/get_survey_content' do
    content = File.read("public/survey.txt")
    savedData = eval(content)
    savedData = savedData.to_json
    puts savedData.to_s

    savedData
  end
end

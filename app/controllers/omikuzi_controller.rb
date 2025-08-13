class OmikuziController < ApplicationController
  def main
    fortunes = ["大吉", "中吉", "小吉", "末吉", "凶"]
    @result = fortunes.sample if request.post?
  end
end

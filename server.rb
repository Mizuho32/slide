#!/usr/bin/env ruby
# coding: utf-8

#require 'sinatra'
require 'webrick'
require 'em-websocket' 
require 'asciidoctor'

$debug = File.open(ARGV[0], "r+")

wsserver = Thread.new{
  begin
    EM::WebSocket.start(host: "localhost", port: 8080) do |ws|
      ws.onopen {
        $debug.puts "Open"
      }

      ws.onmessage {|msg|
        puts "Receive #{msg}!"
        begin
          if msg == "load" then
            ws.send("load:#{Asciidoctor.convert_file('slide.adoc', to_file: false, header_footer: true)}")
          elsif msg == "read" then
            ws.send(File.read('slide.adoc'))
          end
        rescue Exception => ex
          puts ex.message, ex.backtrace
        end
      }

      ws.onclose {
      }
    end
  rescue Exception => ex
    puts ex.message, ex.backtrace
  end
}

webserver = WEBrick::HTTPServer.new({
  :BindAddress => "*",
  :Port => 8000,
  :DocumentRoot => "./public/",
  #:MimeTypes => WEBrick::HTTPUtils::DefaultMimeTypes.merge(
  #  Hash[(a=FTYPES_RAW.map(&:examples).flatten).zip(%w[text/plain]*a.size)]
  #)
})

trap(:INT) {
  wsserver.kill
  webserver.shutdown
}

webserver.start

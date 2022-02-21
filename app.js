
const express = require('express');
// consumindo o npm que faz a mágica
const fs = require('fs');
const ytdl = require('ytdl-core');
const app = express();
const ffmpeg = require('ffmpeg-static');

app.get('/', function (req, res) {
  //peguei da requisicao a url
  
  const {url} = req.query;
  


   let id = ytdl.getURLVideoID(url);
   let valid = ytdl.validateID(id);
   console.log(valid);

   

 

  res.header("Content.Disposition", "attachment; filename='video.mp4'");
 

  const video = ytdl(url,{quality: 136});
  video.on('progress', function(info) {
  console.log('Download progress')
  })
  video.on('end', function(info) {
  console.log('Download finish')
  })

  video.pipe(fs.createWriteStream('video.mp4'));

  const audio = ytdl(url,'audioonly');
  audio.on('progress', function(info) {
  console.log('Download progress')
  })
  audio.on('end', function(info) {
  console.log('Download finish')
  })

  audio.pipe(fs.createWriteStream('audio.mp3'));

  // Objetivo juntar vídeo e áudio com nodejs
  // Pedaço de código que quero implementar para concluir abaixo

  // ffmpegProcess.stdio[3].on('data', chunk => {
  //   // Start the progress bar
  //   if (!progressbarHandle) progressbarHandle = setInterval(showProgress, progressbarInterval);
  //   // Parse the param=value list returned by ffmpeg
  //   const lines = chunk.toString().trim().split('\n');
  //   const args = {};
  //   for (const l of lines) {
  //     const [key, value] = l.split('=');
  //     args[key.trim()] = value.trim();
  //   }
  //   tracker.merged = args;
  // });
  // audio.pipe(ffmpegProcess.stdio[4]);
  // video.pipe(ffmpegProcess.stdio[5]);
  

})

app.listen(3000)

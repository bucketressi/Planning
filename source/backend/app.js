const express = require('express')
, mongoose = require('mongoose');

const app = express();
app.set('port', process.env.PORT || 3001);


app.listen(app.get('port'), ()=>{
	console.log('익스프레스 서버 시작. 포트 : '+app.get('port'));
});
---
typora-root-url: img
typora-copy-images-to: img
---



# Node.js 책 필요사항 정리

## 익스프레스로 웹 서버 만들기

### 서버 만들기

```js
var express = require('express')
, http = require('http');

var app = express();

app.set('port', process.env.PORT || 3001);

http.createServer(app).listen(app.get('port'),function(){
	console.log('익스프레스 서버 시작'+app.get('port'));
}) // express 객체를 http createServer 메소드에 전달
```



#### express 객체

주요 메소드

* set : 서버 설정을 위한 속성 지정
* get : 서버 설정을 위해 속성 불러오기
* use : 미들웨어 함수 사용
* get : 특정 패스로 요청된 정보 처리



### 미들웨어로 클라이언트에 응답 보내기

![1596840429116](/1596840429116.png)

미들웨어와 라우터는 하나의 독립된 기능을 가진 함수이다.

라우터는 요청 path를 보고, 적합한 함수로 분리시키는 기능을 한다.

```js
app.use(function(req, res, next){
	console.log('첫번째 미들웨어');
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.end('<h1>Express 서버 응답 결과</h1>');
})
```

해당 코드를 추가하면, 화면에 'Express 서버 응답 결과'라고 뜨게 된다.



### 미들웨어 추가

```js
app.use(function(req, res, next){
	console.log('첫번째 미들웨어');
	req.user='heeeun';
	next();
})

app.use('/', function(req, res, next){
	console.log('두번째 미들웨어');
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.end('<h1>'+req.user+'</h1>');
})
```

이렇게 여러 개의 미들웨어 함수가 순차적으로 응답하게 할 수도 있다.

미들웨어 함수는 req(요청 객체), res(응답 객체) 를 기본 파라미터로 전달받는다.

해당 미들웨어를 호출한 app 객체를 참조하고 싶다면, req 객체 속성인 app 객체를 다루면 된다.



### 요청 / 응답 객체

express를 사용함으로써 추가로 사용할 수 있는 메소드는 다음과 같다.

* send : 응답 데이터 보내기
  * header가 포함되어있다.
* status : HTTP 상태 코드 반환
  * send와 함께 상태 코드를 전달할 수 있다.
* sendStatus : send + Status
  * 상태 코드만 지정하면 된다.
* redirect : 다른 페이지로 이동
  * 뷰 템플릿을 지정하면, 뷰 엔진이 템플릿의 내용을 html 페이지로 변환 후 결과물을 전송해준다.



#### 요청 객체

* query : 클라이언트에서 GET 방식으로 전송한 파라미터 확인
* body : 클라이언트에서 POST 방식으로 전송한 파라미터 확인
  * body-parser와 같은 외장 모듈을 사용해야함
* header : 헤더 확인

```js
app.use(function(req, res, next){
	console.log('첫번째 미들웨어');
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>hi</h1>');
	res.write('<p>'+req.header('User-Agent')+'</p>');
	res.write('<p>'+req.query.name+'</p>');
	res.end();
})
```



### 미들웨어 사용

직접 만드는 것 말고도 이미 존재하는 미들웨어를 사용할 수 있다.

* static 미들웨어
  * 특정 패스로 접근할 수 있도록 만드는 미들웨어

```js
var static = require('serve-static'); // 패키지 매니저로 설치해야함
app.use('/public',static(path.join(__dirname, 'public')))
```

* body-parser 미들웨어
  * POST 요청 시 파라미터를 확인할 수 있는 미들웨어

```js
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
// x-www-form-urlencodeds 형식 파라미터 파싱
app.use(bodyParser.json());
// application/json 형식 파라미터 파싱
app.use(function(req,res,next){
	console.log('첫번째 미들웨어');

	var paramName = req.body.name;
	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<div>'+paramName+'</div>');
	res.end();
})
```



### 요청 라우팅하기

express의 Router 객체를 이용하여 라우팅 함수를 등록한 뒤, 라우터 객체를 app 객체(express 객체)에 등록함으로써 라우팅 기능을 사용할 수 있다.

라우팅 함수 등록 시에는 다음과 같은 메소드들을 사용할 수 있다.

* get : GET 방식 요청이 발생했을 때 콜백 함수 지정
* post : POST //
* put : PUT //
* delete : DELETE //
* all : 모든 요청 방식 처리

```js

var bodyParser = require('body-parser');
var router = express.Router();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

router.route('/process').post(function(req,res){
	console.log('/process 처리');

	var paramName = req.body.name;
	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<div>'+paramName+'</div>');
})

app.use('/', router);
```



### URL 파라미터 사용

GET에서의 쿼리문과는 다르게, ?가 아닌 /로 구분하여 해당 값을 받을 수도 있다.

이를 토큰(Token)이라고 한다.

* GET : 변수를 req.query로 받음
* POST : 변수를 req.params로 받음

```js

router.route('/process/:number').post(function(req,res){
	.
    .
	res.write('<div>'+req.params.number+'</div>');
    res.end();
})

app.use('/', router);
```



### 에러 페이지 띄우기

1. 기본 처리

```js
app.all('*', function(req, res){
	res.status('404').send('<h1>Error - 페이지 not found</h1>');
})
```

2. express-error-handler 미들웨어 사용

```js
var expressErrorHandler = require('express-error-handler');

var errorHandler = expressErrorHandler({
	static:{
		'404':'./backend/public/404.html'
	}
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
```



### 쿠키 / 세션 관리

쿠키 : 클라이언트 웹 브라우저에 저장되는 정보

세션 : 웹 서버에 저장되는 정보



#### 쿠키 처리

쿠키는 일정 기간동안 저장하고 싶을 때 사용한다. 

cookie-parser 미들웨어를 사용하면 쿠키를 설정하고 확인할 수 있다.

```js
var cookieParser = require('cookie-parser');
app.use(cookieParser());

router.route('/process/showCookie').get(function(req, res){
	console.log('/showCookie 처리');

	res.send(req.cookies);
});
router.route('/process/setCookie').get(function(req, res){
	console.log('/setCookie 처리');

	res.cookie('user',{
		id:1,
		name:'heeeun',
		authorized: true
	});

	res.redirect('/process/showCookie');
});
```





## DB 사용

### 몽고디비 시작

몽고디비는 비관계형 DB이며 NoSQL이라고도 불린다.

비관계형 DB는 관계형 DB에 대비하여 성능이 좋으며, 시스템 자원을 적게 소모한다.

여러 데이터가 모인 하나의 단위를 컬렉션이라고 부르며, 이는 관계형 DB의 테이블과 비슷한 개념이다. 하지만 컬렉션은 정해진 형태가 없다.

컬렉션은 여러 문서 객체를 가질 수 있다.

#### 사용

```
db.users.insert({key:value}); // 삽입
db.users.find().pretty(); // 조회
```

#### 익스프레스에서 사용

```js
var MongoClient = require('mongodb').MongoClient;
var database;
function connectDB(){
	var databaseUrl = 'mongodb://localhost:27017/local';

	MongoClient.connect(databaseUrl,{useUnifiedTopology:true}, function(err, db){
		if(err) throw err;

		console.group('DB 연결됨 : '+ databaseUrl);

		database = db.db('local');
	})
}
var authUser = function(database, id, pw, callback){
	console.log('authUser');

	var users = database.collection('users');

	users.find({"id":id, "password":pw}).toArray(function(err, docs){
		if(err){
			callback(err, null);
			return;
		}
		if(docs.length>0){
			console.log('아이디: [%s], 비밀번호 [%s]', id, pw);
			callback(null, docs);
		}else{
			console.log('없음');
			callback(null, null);
		}
	})
}
```

#### 관리도구

robomongo



## 몽구스로 DB 다루기

비관계형 DB는 스키마가 정해져있지 않으므로, 데이터를 받아올 때 특정 속성이 존재하는지를 판단해야한다. 또한, 같은 속성의 문서 객체를 여러 번 생성할 때는 틀이 존재하는 것이 편하다.

이 때 이용하는 모듈이 Mongoose이다. 

js객체와 DB 객체를 매칭하여 변환해주는 것을 Object Mapper라고 하며, 가장 많이 사용되는 Object Mapper 모듈이 Mongoose이다.

### 몽구스 사용

사용 가능한 메소드들은 다음과 같다.

* connect : mongoose를 사용해 DB에 연결
* Schema : 스키마 정의
* model : 모델 정의

모델 정의 후에 모델 객체에서 사용할 수 있는 메소드들은 다음과 같다.

* find : 컬렉션의 데이터 조회
* save : 인스턴스 객체 데이터 저장
* update : 컬렉션 데이터 조회, 업데이트
* remove : 컬렉션 데이터 삭제

```js
var mongoose = require('mongoose');

var database;
var UserSchema;
var UserModel;

function connectDB(){
	var databaseUrl = 'mongodb://localhost:27017/local';

	mongoose.Promise = global.Promise;
	mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
	database = mongoose.connection;

	database.on('error', console.error.bind(console, 'mongoose connection error.'));
	database.on('open', function(){
		console.log('DB에 연결되었습니다. : '+databaseUrl);
		UserSchema = mongoose.Schema({
			id: {type:String, required:true, unique:true},
			name: String,
			password : String
		});
		console.log('userschema 정의');

		UserModel = mongoose.model("users", UserSchema);
		console.log('usermodel 정의');
	});

	database.on('disconnected', function(){
		console.log('연결 끊어짐');
		setInterval(connectDB, 5000);
	})
}

var addUser = function(database, id, pw, name, callback){
	var user = new UserModel({"id":id, "password":pw, "name":name});

	user.save(function(err){
		if(err){
			callback(err, null);
			return;
		}
		console.log('사용자 데이터 추가');
		callback(null, user);
	})
};
```

### 

### 인덱스와 메소드 사용

#### 인덱스

```js
UserSchema = mongoose.Schema({
			id: {type:String, required:true, unique:true},
			name: {type: String, index:'hashed'},
			password : String,
			created_at:{type:Date, index:{unique: false, expires:'1d'}},
		});
```

스키마를 만들 때, 자주 조회되는 속성에 index를 만들어두면 검색 속도가 빨라진다.

#### 메소드

스키마 객체에 메소드를 추가할 수 있는데,

1. 모델 객체에서 static 함수로 추가할 수도 있고
2. 모델 인스턴스 객체에서 method 함수로 추가할 수도 있다.

```js
UserSchema.static('findById', function(id, callback){
    return timeStamp.find({id:id}, callback);
})
UserSchema.static('findAll', function(callback){
    return this.find({}, callback);
})
UserModel.findById(id, function(err, results){
    ...
});
```



### 비밀번호 암호화하여 저장

#### virtual 함수 이용

단방향 해시 함수로 클라이언트로부터 넘어온 비밀번호를 암호화하여 저장하고, 인증 시에도 마찬가지로 암호화하여 같은지 판단한다.

이러한 기능을 구현하기 위해서 우선 mongoose에서 제공하는 virtual 함수를 통해 가상 속성을 정의해보자.

해당 함수는 스키마에서 넘겨준 password 속성을 중간의 set과 get 함수를 거쳐 hashed_password 속성으로 저장할 수 있도록 변환을 도와주는 함수이다.

```js
UserSchema
		.virtual('info')
		.set(function(info){
			var splitted = infosplit(' ');
			this.id = splitted[0];
			this.name = splitted[1];
		})
		.get(function(){return this.id + ' '+ this.name});
```

예제에서처럼 매개변수로 들어오는 값을 가공하여 저장하는 set 함수를 정의하고, 가공하여 전달하는 get 함수를 정의할 수 있다.



#### crypto 모듈 이용

실제로 비밀번호 암호화를 처리하기 위해 crypto 모듈을 사용해보자.

```js

var createUserSchema = () => {
	UserSchema = mongoose.Schema({
		id: {type:String, required:true, unique:true},
		name: {type: String, index:'hashed'},
		hashed_password : String,
		salt : String,
		created_at:{type:Date, index:{unique: false, expires:'1d'}},
	});

	UserSchema.method('encryptPassword', function(plainText, inSalt){
		if(inSalt){
			return crypto.createHmac('sha1',inSalt).update(plainText).digest('hex');
		}else{
			return crypto.createHmac('sha1',this.salt).update(plainText).digest('hex'); // crypto 함수 사용
		}
	});

	UserSchema.method('makeSalt', function(){
		return Math.round((new Date().valueOf()*Math.random()))+'';
	});

	UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){
		if(inSalt){
			return this.encryptPassword(plainText, inSalt)===hashed_password;
		}else{
			return this.encryptPassword(plainText)===hashed_password;
		}
	})

	UserSchema
		.virtual('password')
		.set(function(password){
			this._password = password;
			this.salt = this.makeSalt();
			this.hashed_password = this.encryptPassword(password);
		}
		.get(function(){return this.id + ' '+ this.name});

	UserModel = mongoose.model("users",UserSchema);
}
```



## 모듈화하기

### 모듈화 방법

js파일로 모듈을 나누고, exports 전역 변수를 사용해서 어디에서나 접근할 수 있도록 정의한다. 다른 js 파일에서는 해당 모듈을 require() 메소드로 불러드린 후 사용하면 된다.

<내보내는 모듈>

```js
exports.getUser = function(){ // export 객체의 속성으로 등록
	return {id:'test01', name:'heeeun'};
}

// 이렇게 작성하면 안됨
exports = {
    getUser: function(){
        return {id:'test01', name:'heeeun'}
    }
}

// 정상 작동하는 코드
var user = {
    getUser: function(){
        return {id:'test01', name:'heeeun'}
    }
}
module.exports = user;
```

> 아래의 코드같이 작성하면, exports가 전역 변수가 아닌 단순 변수로 인식되기 때문에, 불러오는 모듈에서 exports를 참조할 수 없게 된다.

> module.exports와 exports 를 함께 사용하면 module.exports가 우선 적용되므로, module.exports를 사용하자.

<불러오는 모듈>

```js
var user1 = require('./user1'); // require 함수는 export 객체 반환

function showUser(){
	return user1.getUser().name;
}

console.log(showUser());
```



### 전형적인 코드 패턴

* 함수 할당 시

```js
// test.js
exports.function1 = function(){
    // ...
};

// main.js
var func = require('./test').function1;
func();
```

* 인스턴스 객체 할당 시

```js
// test.js
function User(id, name){
    this.id = id;
    this.name = name;
}
User.prototype.function1 = function(){
    //...
}
module.exports = new User('test01','희은');

// main.js
var user = require('./test.js');
user.function1();
```

* 프로토타입 객체 할당 시

```js
//test.js
module.exports = User;

//main.js
var User = require('./test.js');
var user = new User('test01','희은');

user.printUser();
```



### 사용자 정보 관련 기능 모듈화

사용자 등록, 로그인, 리스트 조회 등의 기능을 모듈화 해보자.

모듈화된 쪽의 function에서 모듈을 불러오는 쪽의 변수를 사용해야한다면, 모듈을 불러오는 js에서 app.set()함수를 통해 app에 속성을 할당한 후, 모듈화된 js에서 req.app.get()함수를 통해 해당 속성을 사용하면 된다. 

물론 매개변수로 받을 수도 있다.



### 설정 파일 분리하기

config.js 파일을 하나 만든 후, 

* 포트 정보
* DB url
* DB 스키마 정보
* 라우팅 정보

등을 넣어두고 app.js에서 불러와서 사용하자.


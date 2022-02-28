if(process.env.NODE_ENV === 'production'){ //개발환경이 로컬인지 아니면 배포 모드에서 인지에 따라서도 다르게 해줘야 한다.
    module.exports = require('./prod'); //배포 모드 일 때
}else{
    module.exports = require('./dev'); // 로컬 모드 일 때
}
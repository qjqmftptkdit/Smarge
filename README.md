Smarge v1.2.0
==
## 1. 개요
node.js를 연습하기 위해서 만들게된 이미지 공유사이트

## 2. 실행시키는 방법
1. nodejs, npm, mysql-server를 설치한다.
~~~bash
sudo apt-get install nodejs npm mysql-server
~~~
2. 다운받은 폴더에서 다음 명령어를 실행해서 의존성패키지들을 설치한다.
~~~bash
sudo npm install
~~~
3. 다운받은 폴더의 /func/_config.js의 내용을 수정한 뒤, _config.js를 config.js로 수정한다.
4. config에서 설정한 해당 계정의 '보안 수준이 낮은 앱의 액세스'에 대한 설정을 변경시킨다.
- https://myaccount.google.com/lesssecureapps 
5. mysql을 실행시킨 뒤, sqlInit.sql을 이용해서 mysql을 초기화시킨다.
~~~mysql
SOURCE ./sqlInit.sql
~~~
6. 다운받은 폴더에서 server.js를 nodejs로 실행시킨다.
~~~bash
node server.js
~~~
7. http://localhost:3000/ 과 같이 접속해서 실행이 되는지 확인해본다.

## 3. 취약점 발견 프로그램
취약점 발견시에 카카오톡이나 이메일로 취약점 보고서를 작성해서 보내줄 것.
1. Critical  
- RCE (Remote Code Execution)
- SQLi (SQL Injection)

2. High
- Directory Traversal
- Unintended User Information Leak
- Unprivileged Access
- Weak Password Logic

3. Low
- XSS
- Bussiness Logic Error

4. Information
- 보안상 큰 영향이 없는 사소한 버그들

5. OutBound  
다음의 취약점 내용을 받지 않습니다.
- https 부재에 따른 취약점들 (Snipping, Spoofing, MainInMiddle Attack, ...)
- DOS, DDOS
- 사회공학적 공격
- 물리적접근이 필요한 공격
- 무차별 대입공격에 대한 취약점들

## 4. 버전
1. Smarge v1.0.0.Beta  
2019-08-07에 테스트용으로 공개됨. 회원가입, 이메일 인증, 이미지 올리기, 이미지 공유등 기본적인 기능들을 갖춤.
2. Smarge v1.1.0  
2019-08-08에 공개됨. 이미지 삭제, 계정 편집, 계정 삭제, 이벤트 UI 추가 등의 기능을 새로 갖추게 됨.
3. Smarge v1.2.0  
2019-08-11에 공개됨. 커뮤니티에 이미지 공유, (좋아요,싫어요,조회수) 표시, 공유된 이미지 검색 기능 등을 새로 갖추게 됨.


# IT_Library
# docker 사용방법
## docker-compose 로 개발환경 명령어
1. 컨테이너 개발진행시 : docker-compose -f docker-compose-dev.yml up  명령어 이후 똑같이 개발 진행하면 됩니다.
2. 컨테이너 종료 : docker-compose -f docker-compose-dev.yml stop
3. 컨테이너 재실행 : docker-compose -f docker-compose-dev.yml restart
- 개발할때는 위에 적힌 docker-compose 명령어를 통해 컨테이너를 실행시키고 개발을 진행하면 되고 개발끝나면 컨테이너 종료명령어를 통해 종료시키면 됩니다.
- 오류나거나 하는 부분있으면 바로 알려주세요

*지금 리액트부분 핫리로딩이 먹질 않고 있는데 개발하다 계속 안되면 연락주세요*

- 참고로 위 명령어들이 너무 길어서 ~/.zshrc 에 alias를 통해 단축키를 등록시킬 수 있는데 커멘드를 어떤거 쓰느냐에 따라 ~/.zshrc 혹은 ~/.bashrc
등 다양하니까 명령어가 너무 길게 느껴지면 각자 쓰는 커멘드창 참고해서 단축키 등록이후 사용할 수 있으니까 참고해 주세요.
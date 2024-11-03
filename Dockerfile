FROM ubuntu:24.04 
RUN apt update -y && apt upgrade -y 
RUN apt install git -y
RUN apt install curl -y && apt install nano -y
RUN apt install openjdk-11-jdk -y
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install 20.13.1 
RUN . ~/.nvm/nvm.sh alias default 20.13.1 
RUN . ~/.nvm/nvm.sh use 20.13.1
WORKDIR /project
VOLUME code
VOLUME logs
EXPOSE 5000
RUN touch run.sh
RUN echo '#!/bin/bash \n\
nvm_version_target="v20.13.1"\n\
cd code \n\
current_nvm_version="$(. ~/.nvm/nvm.sh && nvm current)"\n\
if [ "$current_nvm_version" == "$nvm_version_target"]\n\
 then\n\
echo "=== Install mvn and setting"\n\
. ~/.nvm/nvm.sh && nvm install 20.13.1 && nvm alias default 20.13.1 &&  nvm use default\n\
fi\n\
if $(command -v npm &> /dev/null) ; then\n\
 echo "=== settings npm and angular ng"\n\ 
 npm install -g npm\n\ 
 npm install -g @angular/cli && ng version\n\ 
fi\n\
echo "=== compile"\n\ 
if $1 == "dev" ; then\n\
 ng build --base-href /browser/ --configuration=development \n\ 
else\n\
 ng build --base-href /browser/ \n\ 
fi\n\
if ! $(command -v firebase &> /dev/null); then\n\cd 
   echo "=== load emulator firebase"\n\ 
   npm install -g firebase-tools\n\ 
fi\n\
firebase emulators:start > ../logs/ur_app_manage_frontend.log 2>&1 &' > run.sh 
CMD ["sh","run.sh"]
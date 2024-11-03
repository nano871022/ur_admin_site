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
if [ "$current_nvm_version" != "$nvm_version_target" ] ; then\n\
echo "=== Install mvn and setting"\n\
. ~/.nvm/nvm.sh && nvm install 20.13.1 && nvm alias default 20.13.1 &&  nvm use default\n\
else \n\
 echo "use version"\n\
 - ~/.nvm/nvm.sh && nvm use 20.13.1\n\
fi\n\
echo "$(command nvm --version &> /dev/null)"\n\
if [ "$(command npm -v  &> /dev/null)" != "" ] ; then\n\
 echo "=== npm installed $(command -v &> /dev/null)"\n\
else \n\
 echo "=== settings npm and angular ng"\n\
 node install -g npm\n\
fi\n\
if [ "$(command -v ng &> /dev/null)" != "" ] ; then\n\
 echo "=== Installed angular/cli"\n\
else\n\
 echo "=== Installing angular/cli"\n\
 npm install -g @angular/cli && ng version\n\
fi\n\
echo "=== compile"\n\
if  $(command ls node_modules &> /dev/null) ; then\n\
 echo "=== install modules"\n\
 npm install\n\
fi \n\
if [ "$1" != "dev" ] ; then\n\
  echo "=== compile production"\n\
 ng build --base-href /browser/ \n\
else\n\
 echo "=== compile development"\n\
 ng build --base-href /browser/ --configuration=development\n\
fi\n\
if [ "$(command firebase -v  &> /dev/null)" != "not found" ] ; then\n\
 echo "=== firebase installed"\n\
else \n\
   echo "=== load emulator firebase"\n\
   npm install -g firebase-tools\n\
fi\n\
firebase emulators:start > ../logs/ur_app_manage_frontend.log 2>&1 &' > run.sh 
CMD ["sh","run.sh","dev"]
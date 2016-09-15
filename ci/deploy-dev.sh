#!/usr/bin/env bash
PROJECT1=$2
PROJECT2=$3
TARGET_FOLDER='~/driver-server/static-root/public/common-portal/'
FOLDER_NAME1="builds/dev/$PROJECT1"
FOLDER_NAME2="builds/dev/$PROJECT2"
TASK1="$PROJECT1-dev"
TASK2="$PROJECT2-dev"
ASSETS='assets'

echo "clean and build sources"
npm run clean
npm run build:$TASK1
npm run build:$TASK2

echo "erase projects on server"
ssh $1 "cd $TARGET_FOLDER && rm -r $PROJECT1 $PROJECT2 && mkdir $PROJECT1 $PROJECT2"

echo "copy files of $PROJECT1 to $TARGET_FOLDER/$PROJECT1"
scp "$FOLDER_NAME1/* $1:$TARGET_FOLDER/$PROJECT1"

echo "copy files of $PROJECT2 to $TARGET_FOLDER/$PROJECT2"
scp "$FOLDER_NAME2/* $1:$TARGET_FOLDER/$PROJECT2"
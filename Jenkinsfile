#!/usr/bin/env groovy

node('linux') {

  def mvnHome

  stage('checkout') {
    checkout scm

    def changeLogSets = currentBuild.changeSets

    try{
      for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length; j++) {
          def entry = entries[j]
          slackSend (color: '#C8D400', channel: "#tipp-kick-uhr", message: "Checkout #${entry.commitId} by ${entry.author} on ${new Date(entry.timestamp)}: ${entry.msg}")
        }
      }
    }catch(err){
      echo "Fehler beim Senden der Slack-Benachrichtigung zum Commit"
    }
  }

  node('dotnet') {
      stage('C++ compile') {

        }

    }

}

pipeline{
	
		agent {
		label 'Slave_Induccion'
		}
	
        
		options {
			buildDiscarder(logRotator(numToKeepStr: '5'))
			disableConcurrentBuilds()
		}

		tools {
			jdk 'JDK8_Centos' //Verisión preinstalada en la Configuración del Master
		}

		
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GitHub_mauricioolarte', url: 'https://github.com/mauricioolarte/rent_car']]])
				}
			}
		
		
			stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'					
				}
            }
            stage('test '){
                steps {
                    sh 'npm run test:cov'					
				}
            }

			
			stage('Sonar Analysis'){
			 	steps{
			 		echo '------------>Analisis de código estático<------------'
			 		  withSonarQubeEnv('Sonar') {
                         sh "${tool name: 'SonarScanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
                      }
			 	}
			 }

		}
		post {
			success {
				mail(to: 'mauricio.olarte@ceiba.com.co',
				body:"Build success in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}",
				subject: "SUCCESSFULL CI: ${env.JOB_NAME}")
			}
			failure {
				mail(to: 'mauricio.olarte@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}	
			
}

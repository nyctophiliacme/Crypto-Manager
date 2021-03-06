# CryptoFolio
Keep track of your investments on different cryptocurrencies currently on Koinex.

System Requirements: NodeJs

## DeepSource

[![DeepSource](https://deepsource.io/gh/nyctophiliacme/Crypto-Manager.svg/?label=active+issues&show_trend=true)](https://deepsource.io/gh/nyctophiliacme/Crypto-Manager/?ref=repository-badge)

[![DeepSource](https://deepsource.io/gh/nyctophiliacme/Crypto-Manager.svg/?label=resolved+issues&show_trend=true)](https://deepsource.io/gh/nyctophiliacme/Crypto-Manager/?ref=repository-badge)

# Setup Instructions:

1. Download the setup files from here: https://drive.google.com/open?id=1XaY4cIHiYJQ3jPD4T4MWIfsby99udluv
2. Go to setup folder and run the postgres-installer.cmd file. This will install the postgres application.
3. Now go to Environment Variables ( Control Panel -> All Control Panel Items -> System -> Advanced System Settings -> Environment Variables).
4. From the System Variables box select "PATH" Edit. Now append the postgres path to the existing path variable:

	C:\Program Files\PostgreSQL\10\bin

5. The default password is "root". Enter it whenever prompted.

6. Now run the file db-setup.cmd. After the installation you are good to go!

7. Clone the github repository.

	git config --global url.https://github.com/.insteadOf git://github.com/

	git clone git://github.com/nyctophiliacme/Crypto-Manager.git

	Just run the file: run.cmd and the application is launched.

8. Note: If you are unable to pull the files from github because of your organization's proxy network, run the following command:

	git config --global http.proxy http://proxyuser:proxypwd@proxy.server.com:8080

	change proxyuser to your proxy user

	change proxypwd to your proxy password

	change proxy.server.com to the URL of your proxy server
	
	change 8080 to the proxy port configured on your proxy server

	eg) git config --global http.proxy http://www-proxy.us.oracle.com:80

	For reset, use

	git config --global --unset http.proxy



### Screenshots

|  |  |
| --- | --- |
|![Display Page 1](./Screenshots/display-large-1.png) | ![Display Page 2](./Screenshots/display-large-2.png)|
|![Display Page 3](./Screenshots/display-large-3.png) | ![Insert Page 1](./Screenshots/insert-small-1.png)|
|![Insert Page 2](./Screenshots/insert-small-2.png) | ![Display Page 4](./Screenshots/display-small-1.png)|

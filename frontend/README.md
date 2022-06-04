

XacoMeter - An App to monitor the Camino de Santiago based on tweets information, and get relevant statistics about it.  

<a href="https://xacometerfront.herokuapp.com/">
  <img src="../frontend/src/assets/img/concha.jpg" height="60">
  Go to the XacoMeter App deployed online.
</a>

### Key features

- Retrieve data from twitter hashtags related to the Camino de Santiago.
- Allow users to register and login.
- Get last tweets of the hashtags selected.
- Perform a Sentiment Analysis of the tweets.
- Allow admin users to modify the hashtags and keywords of the system.
- Support multi-language.


**Supported languages:** English, Spanish.

### Installation steps.
This project can be locally installed with the following steps.
```bash
npm install
cd ./backend & npm install
cd ../frontend & npm install
cd ..

```
### Run steps
This project can be locally runned with the following steps.

#### Option 1:
This will launch concurrently backend and frontend projects.

```bash
npm run dev
```

#### Option 2:
This will launch backend project.
```bash
npm run api
```

And this will launch frontend project.
```
npm run frontend
```

## License

Copyright (c) 2022 Daniel Tendero García

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
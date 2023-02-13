import react, { useState } from 'react';
import Globe from 'react-globe.gl';
import "./App.css";
import { db } from './db';
import { moonquakes } from './Moonquakes';
import Control from './Control';
import { landings } from './Landing';


const App = () => {
  const [showBg, setShowBg] = useState(true);
  const [showRealData, setShowRealData] = useState(false);
  const [showLandings, setShowlandings] = useState(false);
  const [currentYear, setCurrentYear] = useState(1996);


  const toggleBg = () => {
    setShowBg(!showBg);
  }

  const toggleRealData = () => {
    setShowRealData(!showRealData);
  }

  const toggleLandings = () => {
    setShowlandings(!showLandings);
  }

  const changeYear = (newYear) => {
    setCurrentYear(newYear);
  }

  const renderedData = () => {
    return (
      moonquakes
        .filter(info => {
          return info.year == currentYear
        })
        .map(info => {
          return {
            lat: info.lat,
            lng: info.lng,
            maxR: Math.random() * 5 + 3,
            resolution: 1200,
            color: "#ff0000",
            speed: Math.random() * 3 + 2
          }
        })
    );
  }

  const filteredData = () => {
    return moonquakes.filter(info => {
      return info.year == currentYear;
    })
  };

  const filteredForInfo = () => {
    return moonquakes.filter(info => {
      return info.year == currentYear;
    })
  }

  const renderLandings = landings.map(info => {
    return {
      lat: info.lat,
      lng: info.lng,
      maxR: Math.min((info.traverse + info.evaTime) / 3, 10),
      resolution: 1200,
      color: "#00ff00",
      speed: Math.random() * 3 + 2
    }
  })


  const totalData = () => {

  }

  const renderRealData = () => {
    if (showRealData && showLandings) return [...renderedData(), ...renderLandings]
    else if (showRealData) return renderedData()
    else if (showLandings) return renderLandings
    return []
  }


  const renderBackGround = () => {
    if (showBg) return "https://scontent.ftbs5-3.fna.fbcdn.net/v/t39.30808-6/309877651_162041076437482_7104670467886333394_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=OTantweqU68AX-i1qUa&_nc_ht=scontent.ftbs5-3.fna&oh=00_AT-dTvHOPQStCDFY74P6i4kJ5IM7gzdTTf_ujw4DzVedoQ&oe=633E1351"
    return ""
  }


  const renderRealDataLayer = () => {
    if (showLandings && showRealData) {
      return (d) => {
        const el = document.createElement('div');
        if (d.name) {
          el.innerText =
            `name: ${d.name}
        latitude: ${d.lat}
        longitude: ${d.lng}
        launching date: ${d.launchDate}
        landing date: ${d.landingDate}
        landing site: ${d.landingSite}
        EVA time: ${d.evaTime + "hr"}
        `
        } else if (d.date) {
          el.innerText =
            `latitude: ${d.lat}
        longitude: ${d.lng}
        date: ${d.date}`
        }

        el.className = 'test';

        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';
        return el;
      }
    }
    else
      if (showRealData) {
        return (d) => {
          const el = document.createElement('div');
          el.innerText =
            `latitude: ${d.lat}
      longitude: ${d.lng}
      date: ${d.date}`
          el.className = 'test';

          el.style['pointer-events'] = 'auto';
          el.style.cursor = 'pointer';
          return el;
        }
      }
      else
        if (showLandings) {
          return (d) => {
            const el = document.createElement('div');

            el.innerText =
              `name: ${d.name}
        latitude: ${d.lat}
        longitude: ${d.lng}
        launching date: ${d.launchDate}
        landing date: ${d.landingDate}
        landing site: ${d.landingSite}
        EVA time: ${d.evaTime + "hr"}
        `

            el.className = 'test';

            el.style['pointer-events'] = 'auto';
            el.style.cursor = 'pointer';
            return el;
          }
        }


  }

  const elementsDataGenerator = () => {
    console.log(renderedData())
    console.log(filteredForInfo())
    if (showLandings && showRealData) return [...filteredForInfo(), ...landings]
    if (showLandings) return landings
    if (showRealData) return filteredForInfo()
    return []
  }


  return (
    <div className='main'>
      <Control
        bgcallback={toggleBg}
        realdatacallback={toggleRealData}
        landingscallback={toggleLandings}
        yearcallback={changeYear}
        moonquake={showRealData}
        bgboolean={showBg}
        landingsboolean={showLandings}
      />
      <Globe className="globusi"
        globeImageUrl={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Solarsystemscope_texture_8k_moon.jpg/800px-Solarsystemscope_texture_8k_moon.jpg?20201026210157"}
        // backgroundImageUrl={renderBackGround()}
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor={'grey'}
        atmosphereAltitude={0.27}
        ringsData={renderRealData()}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed='speed'
        htmlElementsData={elementsDataGenerator()}
        htmlElement={renderRealDataLayer()}
      />
    </div>
  );
}

export default App;
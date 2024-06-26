import React, { useEffect, useRef, memo } from 'react';

function ProfileWidget(props) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
        "symbol": "NASDAQ:${props.name}",
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "colorTheme": "light",
        "isTransparent": true
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
    
    <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(ProfileWidget);

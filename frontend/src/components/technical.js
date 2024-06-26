import React, { useEffect, useRef, memo } from 'react';

function TechnicalWidget(props) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
        "interval": "1m",
        "width": "425",
        "isTransparent": true,
        "height": "450",
        "symbol": "NASDAQ:${props.name}",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "light"
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

export default memo(TechnicalWidget);
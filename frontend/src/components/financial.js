import React, { useEffect, useRef, memo } from 'react';

function FinancialWidget(props) {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
        "isTransparent": false,
        "largeChartUrl": "",
        "displayMode": "compact",
        "width": "100%",
        "height": "100%",
        "colorTheme": "light",
        "symbol": "NASDAQ:${props.name}",
        "locale": "en"

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

export default memo(FinancialWidget);

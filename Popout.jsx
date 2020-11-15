const { React, getModule } = require('powercord/webpack');
const { PopoutWindow, Spinner } = require('powercord/components');
const Titlebar = require('./Titlebar');
function Popout (props) {
  const [ loading, setLoading ] = React.useState(true);
  /*
   *   const divRef = div => {
   *     console.log(div.ownerDocument.defaultView);
   *     props.resolve(div.ownerDocument.defaultView);
   *     const win = div.ownerDocument.defaultView;
   *     delete win.opener;
   *     delete win.require;
   *     delete win.DiscordNative;
   *     // win.location.href = props.url;
   *   };
   */
  return (
    <div className = 'popout'>
      <Titlebar type='WINDOWS' windowKey={props.windowId} themeOverride={props.theme} />
      <iframe src = {props.url}
        onLoad = {() => setLoading(false)}
        className = 'popoutcontentFrame'
        allowtransparency="true"
        sandbox='allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation'
      />
      <div className = {`popoutspinner${loading ? '' : ' popoutspinnerbehind'}`}>
        <Spinner/>
      </div>
    </div>
  );
}


module.exports = function (props, name, id) {
  return new Promise((resolve) => {
    const popoutModule = getModule([ 'setAlwaysOnTop', 'open' ], false);
    popoutModule.open(id, (key) =>
      React.createElement(PopoutWindow, {
        windowKey: key,
        title: name
      }, React.createElement(Popout, { ...props,
        resolve }))
    );
  });
};

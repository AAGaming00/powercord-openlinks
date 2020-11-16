const { React, getModule } = require('powercord/webpack');
const { PopoutWindow, Spinner } = require('powercord/components');
const Titlebar = require('./Titlebar');
function Popout (props) {
  const [ loading, setLoading ] = React.useState(true);

  /*
   * const divRef = div => {
   *   // console.log(div.ownerDocument.defaultView);
   *   console.log(div)
   *   props.resolve(div.ownerDocument.defaultView);
   *   const win = div.ownerDocument.defaultView;
   *   delete win.opener;
   *   delete win.require;
   *   delete win.DiscordNative;
   * };
   */

  return (
    <div className = 'popout'>
      <Titlebar type='WINDOWS' windowKey={props.windowId} themeOverride={props.theme} />
      <div className = 'popoutcontentFrame'>
        <iframe src = {props.url}
          onLoad = {() => setLoading(false)}
          className = 'popoutcontentFrameInner'
          allowtransparency="true"
          sandbox='allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts'
        />
      </div>
      {loading
        ? <div className = 'popoutspinner'>
          <Spinner/>
        </div>
        : null}
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
      }, React.createElement(Popout, { ...props, windowId: id,
        resolve }))
    );
  });
};

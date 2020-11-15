const { React, getModule } = require('powercord/webpack');
const { PopoutWindow, Spinner } = require('powercord/components');

const { Spinner } = require('powercord/components');
function Popout (props) {
  const divRef = div => {
    props.resolve(div.ownerDocument.defaultView);
    const win = div.ownerDocument.defaultView;
    delete win.opener;
    delete win.require;
    delete win.DiscordNative;
    win.location.href = props.url;
  };

  return (
    <div ref = {divRef} className = 'popout popoutspinner'><Spinner/></div>
  );
}


module.exports = function (props, name, id) {
  return new Promise((resolve) => {
    const popoutModule = getModule([ 'setAlwaysOnTop', 'open' ], false);
    popoutModule.open(id, () =>
      React.createElement(Popout, { ...props,
        resolve })
    );
  });
};

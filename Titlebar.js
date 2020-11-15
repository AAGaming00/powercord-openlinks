const { React, getModule, getModuleByDisplayName } = require('powercord/webpack');
const { AsyncComponent } = require('powercord/components');

module.exports = AsyncComponent.from((async () => {
  //const Wordmark = AsyncComponent.from(getModuleByDisplayName('DiscordWordmark'));
  const titleBar = await getModule(m => typeof m === 'function' && m.toString().includes('PlatformTypes.WINDOWS') && m.toString().includes('PlatformTypes.OSX'));
  const windows = titleBar({ type: 'WINDOWS' }).type;
  return windows;
  return (props) => {
    const res = windows(props);
    res.props.className += ' popout-title';
    // res.props.children[0].props.children = React.createElement(Wordmark, { height: 16 });
    return res;
  };
})());

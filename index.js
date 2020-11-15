const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const popout = require('./Popout');

module.exports = class OpenLinksInDiscord extends Plugin {
  async startPlugin () {
    this.loadStylesheet('./style.scss');
    const Anchor = await getModule(x => x.default?.displayName === 'Anchor');
    const oDefault = Anchor.default;
    inject('open-links', Anchor, 'default', (args, res) => {
      res.props.oClick = res.props.onClick;
      res.props.onClick = (e) => {
        if (!e.shiftKey) {
          res.props.oClick(e);
          return;
        }
        e.preventDefault();
        this.openPopout({ url: res.props.href }, 'Discord Popout');
        return false;
      };
      return res;
    });
    Object.assign(Anchor.default, oDefault);
    Anchor.default.toString = oDefault.toString;
  }

  openPopout (props, title) {
    const windowId = `DISCORD_EXT_LINK_${(Math.random().toString(36) + Date.now()).substring(2, 7)}`;
    popout({ ...props,
      windowId }, title, windowId);
  }

  pluginWillUnload () {
    uninject('open-links');
  }
};

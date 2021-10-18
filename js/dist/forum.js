module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=36)}([function(t,e){t.exports=flarum.core.compat["common/extend"]},function(t,e){t.exports=flarum.core.compat.app},function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat["utils/string"]},function(t,e){t.exports=flarum.core.compat["forum/components/CommentPost"]},function(t,e){t.exports=flarum.core.compat["forum/components/PostPreview"]},function(t,e){t.exports=flarum.core.compat["common/helpers/username"]},function(t,e){t.exports=flarum.core.compat["components/CommentPost"]},function(t,e){t.exports=flarum.core.compat["forum/components/EditPostComposer"]},function(t,e){t.exports=flarum.core.compat.Fragment},function(t,e){t.exports=flarum.core.compat["components/Notification"]},function(t,e){t.exports=flarum.core.compat["common/components/TextEditor"]},function(t,e){t.exports=flarum.core.compat["helpers/username"]},function(t,e){t.exports=flarum.core.compat["utils/extractText"]},,function(t,e){t.exports=flarum.core.compat["components/NotificationGrid"]},function(t,e){t.exports=flarum.core.compat["common/components/LoadingIndicator"]},function(t,e){t.exports=flarum.core.compat["common/Model"]},function(t,e){t.exports=flarum.core.compat["common/models/Post"]},function(t,e){t.exports=flarum.core.compat["common/components/Link"]},function(t,e){t.exports=flarum.core.compat["common/helpers/punctuateSeries"]},function(t,e){t.exports=flarum.core.compat["common/helpers/icon"]},function(t,e){t.exports=flarum.core.compat["components/Button"]},function(t,e){t.exports=flarum.core.compat["forum/utils/DiscussionControls"]},function(t,e){t.exports=flarum.core.compat["helpers/icon"]},function(t,e){t.exports=flarum.core.compat["common/components/TextEditorButton"]},function(t,e){t.exports=flarum.core.compat["forum/components/ReplyComposer"]},function(t,e){t.exports=flarum.core.compat["common/helpers/avatar"]},function(t,e){t.exports=flarum.core.compat["common/helpers/highlight"]},function(t,e){t.exports=flarum.core.compat["forum/utils/KeyboardNavigatable"]},function(t,e){t.exports=flarum.core.compat["common/utils/string"]},function(t,e){t.exports=flarum.core.compat["common/utils/throttleDebounce"]},function(t,e){t.exports=flarum.core.compat["components/UserPage"]},function(t,e){t.exports=flarum.core.compat["components/LinkButton"]},function(t,e){t.exports=flarum.core.compat["components/PostsUserPage"]},,function(t,e,n){"use strict";n.r(e),n.d(e,"filterUserMentions",(function(){return jt})),n.d(e,"filterPostMentions",(function(){return Ot}));var o=n(2),r=n(1),s=n.n(r),i=n(15),a=n.n(i),u=n(3),c=n(0),p=n(4),f=n.n(p),l=n(5),d=n.n(l),h=n(16),v=n.n(h);var b=n(17),y=n.n(b),g=n(18),x=n.n(g),w=n(19),P=n.n(w),C=n(20),_=n.n(C),M=n(6),T=n.n(M),j=n(21),O=n.n(j);var B=n(22),A=n.n(B),k=n(7),S=n.n(k),H=n(23),N=n.n(H),I=n(8),D=n.n(I),E=function(){return app.translator.trans("core.lib.username.deleted_text")};function W(t,e){return void 0===e&&(e=!0),t?((e?t.displayName():t.username())||E()).replace(/"#[a-z]{0,3}[0-9]+/,"_"):E().replace(/"#[a-z]{0,3}[0-9]+/,"_")}function U(t,e){return void 0===e?app.forum.attribute("allowUsernameMentionFormat")?"@"+W(t,!1):'@"'+W(t)+'"#'+t.id():'@"'+W(t)+'"#p'+e}function L(t,e,n){var o=U(t.user(),t.id())+" ";e.fields.content()||(e.body.attrs.originalContent=o);var r=e.editor.getSelectionRange()[0],s=e.fields.content().slice(0,r),i=0==s.length?0:3-s.match(/(\n{0,2})$/)[0].length;e.editor.insertAtCursor(Array(i).join("\n")+(n?"> "+o+n.trim().replace(/\n/g,"\n> ")+"\n\n":o),!1)}function R(t,e){app.composer.bodyMatches(D.a)&&app.composer.body.attrs.post.discussion()===t.discussion()?L(t,app.composer,e):N.a.replyAction.call(t.discussion()).then((function(n){return L(t,n,e)}))}function q(t,e){return(q=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function J(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,q(t,e)}var z=n(9),F=n.n(z),X=n(24),Y=n.n(X),G=function(t){function e(e){var n;return(n=t.call(this)||this).post=e,n}J(e,t);var n=e.prototype;return n.view=function(){var t=this;return m("button",{class:"Button PostQuoteButton",onclick:function(){R(t.post,t.content)}},Y()("fas fa-quote-left",{className:"Button-icon"}),app.translator.trans("flarum-mentions.forum.post.quote_button"))},n.show=function(t,e){var n=this.$().show(),o=n.offsetParent().offset();n.css("left",t-o.left).css("top",e-o.top),this.hideHandler=this.hide.bind(this),$(document).on("mouseup",this.hideHandler)},n.showStart=function(t,e){var n=this.$();this.show(t,$(window).scrollTop()+e-n.outerHeight()-5)},n.showEnd=function(t,e){var n=this.$();this.show(t-n.outerWidth(),$(window).scrollTop()+e+5)},n.hide=function(){this.$().hide(),$(document).off("mouseup",this.hideHandler)},e}(F.a);function K(){Object(o.extend)(S.a.prototype,"oncreate",(function(){var t=this.attrs.post;if(!(t.isHidden()||app.session.user&&!t.discussion().canReply())){var e=this.$(".Post-body"),n=$('<div class="Post-quoteButtonContainer"></div>'),o=new G(t),r=function(t){setTimeout((function(){var r=function(t){var e=window.getSelection();if(null!=e&&e.rangeCount){var n=e.getRangeAt(0),o=n.commonAncestorContainer;if(t[0]===o||$.contains(t[0],o)){var r=$("<div>").append(n.cloneContents());return r.find("img.emoji").replaceWith((function(){return this.alt})),r.find("img").replaceWith((function(){return"![]("+this.src+")"})),r.find("a").replaceWith((function(){return"["+this.innerText+"]("+this.href+")"})),r.text()}}return""}(e);if(r){o.content=r,m.render(n[0],o.render());var s=window.getSelection().getRangeAt(0).getClientRects(),i=s[0];if(t.clientY<i.bottom&&t.clientX-i.right<i.left-t.clientX)o.showStart(i.left,i.top);else{var a=s[s.length-1];o.showEnd(a.right,a.bottom)}}}),1)};this.$().after(n).on("mouseup",r),"ontouchstart"in window&&document.addEventListener("selectionchange",r,!1)}}))}var Q=n(11),V=n.n(Q),Z=n(25),tt=n.n(Z),et=n(26),nt=n.n(et),ot=n(27),rt=n.n(ot),st=n(28),it=n.n(st),at=n(29),ut=n.n(at),ct=n(30),pt=n(31),ft=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))||this).items=[],e.active=!1,e.index=0,e.keyWasJustPressed=!1,e}J(e,t);var n=e.prototype;return n.view=function(){return m("ul",{className:"Dropdown-menu MentionsDropdown"},this.items.map((function(t){return m("li",null,t)})))},n.show=function(t,e){this.$().show().css({left:t+"px",top:e+"px"}),this.active=!0},n.hide=function(){this.$().hide(),this.active=!1},n.navigate=function(t){var e=this;this.keyWasJustPressed=!0,this.setIndex(this.index+t,!0),clearTimeout(this.keyWasJustPressedTimeout),this.keyWasJustPressedTimeout=setTimeout((function(){return e.keyWasJustPressed=!1}),500)},n.complete=function(){this.$("li").eq(this.index).find("button").click()},n.setIndex=function(t,e){if(!this.keyWasJustPressed||e){var n=this.$(),o=n.find("li"),r=t;r<0?r=o.length-1:r>=o.length&&(r=0),this.index=r;var s=o.removeClass("active").eq(r).addClass("active");if(e){var i,a=n.scrollTop(),u=n.offset().top,c=u+n.outerHeight(),p=s.offset().top,f=p+s.outerHeight();p<u?i=a-u+p-parseInt(n.css("padding-top"),10):f>c&&(i=a-c+f+parseInt(n.css("padding-bottom"),10)),void 0!==i&&n.stop(!0).animate({scrollTop:i},100)}}},e}(F.a),mt=Object(pt.throttle)(250,(function(t,e,n,o,r,s){var i=t.toLowerCase();e.includes(i)||(app.store.find("users",{filter:{q:t},page:{limit:5}}).then((function(t){t.forEach((function(t){o.has(t.id())||(o.add(t.id()),n.push(t))})),s()})),e.push(i))}));function lt(){var t=$('<div class="ComposerBody-mentionsDropdownContainer"></div>'),e=new ft;Object(c.extend)(V.a.prototype,"oncreate",(function(){var n=this.$(".TextEditor-editor").wrap('<div class="ComposerBody-mentionsWrapper"></div>');this.navigator=new ut.a,this.navigator.when((function(){return e.active})).onUp((function(){return e.navigate(-1)})).onDown((function(){return e.navigate(1)})).onSelect(e.complete.bind(e)).onCancel(e.hide.bind(e)).bindTo(n),n.after(t)})),Object(c.extend)(V.a.prototype,"buildEditorParams",(function(n){var o,r,s,i,a=[],u=Array.from(app.store.all("users")),c=new Set(u.map((function(t){return t.id()})));n.inputListeners.push((function(){var n=app.composer.editor.getSelectionRange(),p=n[0];if(!(n[1]-p>0)){var f=app.composer.editor.getLastNChars(30);r=0;for(var l=f.length-1;l>=0;l--){if("@"===f.substr(l,1)&&(0==l||/\s/.test(f.substr(l-1,1)))){o=l+1,r=p-f.length+l+1;break}}if(e.hide(),e.active=!1,r){s=f.substring(o).toLowerCase(),i=s.match(/^["|“]((?:(?!"#).)+)$/),s=i&&i[1]||s;var d=function(t,n,o,i){void 0===i&&(i="");var a=T()(t);return s&&(a.children=[it()(a.text,s)],delete a.text),m("button",{className:"PostPreview "+i,onclick:function(){return function(t){app.composer.editor.replaceBeforeCursor(r-1,t+" "),e.hide()}(n)},onmouseenter:function(){e.setIndex($(this).parent().index())}},m("span",{className:"PostPreview-content"},rt()(t),a," ",o))},h=function(t){return[t.username(),t.displayName()].some((function(t){return t.toLowerCase().substr(0,s.length)===s}))},v=function(){var n=[];if(s&&u.forEach((function(t){h(t)&&n.push(d(t,U(t),"","MentionsDropdown-user"))})),app.composer.bodyMatches(nt.a)||app.composer.bodyMatches(D.a)){var o=app.composer.body.attrs,i=o.post,a=i&&i.discussion()||o.discussion;a&&a.posts().filter((function(t){return t&&"comment"===t.contentType()&&(!i||t.number()<i.number())})).sort((function(t,e){return e.createdAt()-t.createdAt()})).filter((function(t){var e=t.user();return e&&h(e)})).splice(0,5).forEach((function(t){var e=t.user();n.push(d(e,U(e,t.id()),[app.translator.trans("flarum-mentions.forum.composer.reply_to_post_text",{number:t.number()})," — ",Object(ct.truncate)(t.contentPlain(),200)],"MentionsDropdown-post"))}))}if(n.length){e.items=n,m.render(t[0],e.render()),e.show();var c=app.composer.editor.getCaretCoordinates(r),p=e.$().outerWidth(),f=e.$().outerHeight(),l=e.$().offsetParent(),v=c.left,b=c.top+15;b+f>l.height()&&(b=c.top-f-15),v+p>l.width()&&(v=l.width()-p),b=Math.max(-(l.offset().top-$(document).scrollTop()),b),v=Math.max(-l.offset().left,v),e.show(v,b)}else e.active=!1,e.hide()};e.active=!0,v(),e.setIndex(0),e.$().scrollTop(0),s.length>1&&app.forum.attribute("canSearchUsers")&&mt(s,a,u,c,e,v)}}}))})),Object(c.extend)(V.a.prototype,"toolbarItems",(function(t){var e=this;t.add("mention",m(tt.a,{onclick:function(){return e.attrs.composer.editor.insertAtCursor(" @")},icon:"fas fa-at"},app.translator.trans("flarum-mentions.forum.composer.mention_tooltip")))}))}var dt=n(10),ht=n.n(dt),vt=function(t){function e(){return t.apply(this,arguments)||this}J(e,t);var n=e.prototype;return n.icon=function(){return"fas fa-reply"},n.href=function(){var t=this.attrs.notification,e=t.subject(),n=t.content();return app.route.discussion(e.discussion(),n&&n.replyNumber)},n.content=function(){var t=this.attrs.notification.fromUser();return app.translator.trans("flarum-mentions.forum.notifications.post_mentioned_text",{user:t,count:1})},n.excerpt=function(){return Object(u.truncate)(this.attrs.notification.subject().contentPlain(),200)},e}(ht.a),bt=function(t){function e(){return t.apply(this,arguments)||this}J(e,t);var n=e.prototype;return n.icon=function(){return"fas fa-at"},n.href=function(){var t=this.attrs.notification.subject();return app.route.discussion(t.discussion(),t.number())},n.content=function(){var t=this.attrs.notification.fromUser();return app.translator.trans("flarum-mentions.forum.notifications.user_mentioned_text",{user:t})},n.excerpt=function(){return Object(u.truncate)(this.attrs.notification.subject().contentPlain(),200)},e}(ht.a),yt=n(32),gt=n.n(yt),xt=n(33),wt=n.n(xt),Pt=n(34),$t=function(t){function e(){return t.apply(this,arguments)||this}return J(e,t),e.prototype.loadResults=function(t){return app.store.find("posts",{filter:{type:"comment",mentioned:this.user.id()},page:{offset:t,limit:this.loadLimit},sort:"-createdAt"})},e}(n.n(Pt).a),Ct=n(12),_t=n.n(Ct),Mt=n(13),Tt=n.n(Mt);function jt(t){var e;if(app.forum.attribute("allowUsernameMentionFormat")&&t.hasAttribute("username")?e=app.store.getBy("users","username",t.getAttribute("username")):t.hasAttribute("id")&&(e=app.store.getById("users",t.getAttribute("id"))),e)return t.setAttribute("id",e.id()),t.setAttribute("slug",e.slug()),t.setAttribute("displayname",Tt()(_t()(e))),!0;t.invalidate()}function Ot(t){var e=app.store.getById("posts",t.getAttribute("id"));if(e)return t.setAttribute("discussionid",e.discussion().id()),t.setAttribute("number",e.number()),t.setAttribute("displayname",Tt()(_t()(e.user()))),!0}s.a.initializers.add("flarum-mentions",(function(){!function(){function t(){var t=this.attrs.post.contentHtml();if(t!==this.oldPostContentHtml&&!this.isEditing()){this.oldPostContentHtml=t;var e=this.attrs.post,n=this.$();this.$().on("click",".UserMention:not(.UserMention--deleted), .PostMention:not(.PostMention--deleted)",(function(t){m.route.set(this.getAttribute("href")),t.preventDefault()})),this.$(".PostMention:not(.PostMention--deleted)").each((function(){var t,o=$(this),r=o.data("id"),s=$('<ul class="Dropdown-menu PostMention-preview fade"/>');n.append(s);var i=function(){return $('.PostStream-item[data-id="'+r+'"]')},a=function(){var t=i(),a=!1;if(t.length){var u=t.offset().top,c=window.pageYOffset;u>c&&u+t.height()<c+$(window).height()&&(t.addClass("pulsate"),a=!0)}if(!a){var p=function(){var t=s.outerHeight(!0),e=0;o.offset().top-t<$(window).scrollTop()+$("#header").outerHeight()?e+=o.outerHeight(!0):e-=t,s.show().css("top",o.offset().top-n.offset().top+e).css("left",o.offsetParent().offset().left-n.offset().left).css("max-width",o.offsetParent().width())},f=function(t){var n=t.discussion();m.render(s[0],[n!==e.discussion()?m("li",null,m("span",{className:"PostMention-preview-discussion"},n.title())):"",m("li",null,d.a.component({post:t}))]),p()},l=app.store.getById("posts",r);l&&l.discussion()?f(l):(m.render(s[0],v.a.component()),app.store.find("posts",r).then(f),p()),setTimeout((function(){return s.off("transitionend").addClass("in")}))}},u=function(){i().removeClass("pulsate"),s.hasClass("in")&&s.removeClass("in").one("transitionend",(function(){return s.hide()}))};o.on("touchend",(function(t){t.cancelable&&t.preventDefault()})),o.add(s).hover((function(){clearTimeout(t),t=setTimeout(a,250)}),(function(){clearTimeout(t),i().removeClass("pulsate"),t=setTimeout(u,250)})).on("touchend",(function(t){a(),t.stopPropagation()})),$(document).on("touchend",u)}))}}Object(c.extend)(f.a.prototype,"oncreate",t),Object(c.extend)(f.a.prototype,"onupdate",t)}(),function(){function t(){this.$(".Post-mentionedBy-preview").removeClass("in").one("transitionend",(function(){$(this).hide()}))}x.a.prototype.mentionedBy=y.a.hasMany("mentionedBy"),Object(c.extend)(f.a.prototype,"oncreate",(function(){var e,n=this,o=this.attrs.post.mentionedBy();if(o&&o.length){var r=$('<ul class="Dropdown-menu Post-mentionedBy-preview fade"/>');this.$().append(r);var s=this.$(),i=this.$(".Post-mentionedBy"),a=function(){!r.hasClass("in")&&r.is(":visible")||(m.render(r[0],o.map((function(e){return m("li",{"data-number":e.number()},d.a.component({post:e,onclick:t.bind(n)}))}))),r.show().css("top",i.offset().top-s.offset().top+i.outerHeight(!0)).css("left",i.offsetParent().offset().left-s.offset().left).css("max-width",s.width()),setTimeout((function(){return r.off("transitionend").addClass("in")})))};i.add(r).hover((function(){clearTimeout(e),e=setTimeout(a,250)}),(function(){clearTimeout(e),e=setTimeout(t,250)})),this.$().find(".Post-mentionedBy-summary a").hover((function(){r.find('[data-number="'+$(this).data("number")+'"]').addClass("active")}),(function(){r.find("[data-number]").removeClass("active")}))}})),Object(c.extend)(f.a.prototype,"footerItems",(function(e){var n=this,o=this.attrs.post.mentionedBy();if(o&&o.length){var r=[],s=o.sort((function(t){return t.user()===app.session.user?-1:0})).filter((function(t){var e=t.user();if(-1===r.indexOf(e))return r.push(e),!0})),i=s.length>4,a=s.slice(0,i?3:4).map((function(e){var o=e.user();return m(P.a,{href:app.route.post(e),onclick:t.bind(n),"data-number":e.number()},app.session.user===o?app.translator.trans("flarum-mentions.forum.post.you_text"):T()(o))}));if(i){var u=s.length-a.length;a.push(app.translator.trans("flarum-mentions.forum.post.others_text",{count:u}))}e.add("replies",m("div",{className:"Post-mentionedBy"},m("span",{className:"Post-mentionedBy-summary"},O()("fas fa-reply"),app.translator.trans("flarum-mentions.forum.post.mentioned_by"+(s[0].user()===app.session.user?"_self":"")+"_text",{count:a.length,users:_()(a)}))))}}))}(),Object(o.extend)(S.a.prototype,"actionItems",(function(t){var e=this.attrs.post;e.isHidden()||app.session.user&&!e.discussion().canReply()||t.add("reply",m(A.a,{className:"Button Button--link",onclick:function(){return R(e)}},app.translator.trans("flarum-mentions.forum.post.reply_link")))})),K(),lt(),s.a.notificationComponents.postMentioned=vt,s.a.notificationComponents.userMentioned=bt,Object(o.extend)(a.a.prototype,"notificationTypes",(function(t){t.add("postMentioned",{name:"postMentioned",icon:"fas fa-reply",label:s.a.translator.trans("flarum-mentions.forum.settings.notify_post_mentioned_label")}),t.add("userMentioned",{name:"userMentioned",icon:"fas fa-at",label:s.a.translator.trans("flarum-mentions.forum.settings.notify_user_mentioned_label")})})),s.a.routes["user.mentions"]={path:"/u/:username/mentions",component:$t},Object(o.extend)(gt.a.prototype,"navItems",(function(t){var e=this.user;t.add("mentions",wt.a.component({href:s.a.route("user.mentions",{username:e.slug()}),name:"mentions",icon:"fas fa-at"},s.a.translator.trans("flarum-mentions.forum.user.mentions_link")),80)})),u.getPlainContent.removeSelectors.push("a.PostMention")}))}]);
//# sourceMappingURL=forum.js.map
var fomowidget = {
    widgetContainer: "",
    widgetInnerContent: "",
    closeButton: "",
    loop_index: 0,
  
    init: function() {
      var self = this;
  
      // Hide widgets on mobile devices
      if (self.settings.hideOnMobile && self.isMobile()) {
        return true;
      }
  
      self.shuffleArray(self.data);
  
      self.appendWidget();
  
      self.eventClose();
  
      setTimeout(function() {
        self.rotateWidget();
      }, self.settings.intialDelay);
    },
  
    // Load widget CSS and HTML
    appendWidget: function() {
      var self = this;
  
      // CSS
      var css = document.createElement("style");
      css.innerHTML = self.settings.widgetCss;
      document.body.appendChild(css);
  
      // HTML
      document.body.innerHTML += self.settings.widgetHtml;
  
      // Get DOM elements
      self.widgetContainer = document.getElementById("cp-purchase-notification");
      self.widgetInnerContent = document.getElementById("cp-widget-inner");
      self.closeButton = document.getElementById("cp-widget-close");
    },
  
    // Show widget
    showWidget: function() {
      var self = this;
      self.widgetContainer.classList.remove("animate__fadeOutDown");
      self.widgetContainer.classList.add("animate__fadeInUp");
      self.widgetContainer.style.display = "block";
    },
  
    // Hide widget
    hideWidget: function() {
      var self = this;
      self.widgetContainer.classList.remove("animate__fadeInUp");
      self.widgetContainer.classList.add("animate__fadeOutDown");
    },
  
    // Rotate widget content
    rotateWidget: function() {
      var self = this;
  
      // update widget content
      // @TODO: check if item exists
      var data = self.data[self.loop_index];
      // @TODO: check if item prop exists
      self.widgetInnerContent.innerHTML = `<div class="-my-16 -ml-2">
      <img class="w-auto h-24 rounded-full lazy" loading="lazy" src="${data.image}"/>
    </div>
    <div class="grid grid-cols-3 gap-4 space-y-2 ml-2">
      <div class="col-span-3 flex flex-col md:items-start">
        <h4 class="text-xl font-medium mb-0">${data.customer_name} from <b>${data.customer_city}</b></h4>
        <p class="text-base font-medium text-gray-400 mb-0">just bought <b>${data.product_title}</b> <small>A few hours ago</small></p>
      </div>
    </div>`;
  
      self.showWidget();
  
      // increment loop index
      self.loop_index++;
      self.loop_index =
        self.loop_index >= self.data.length ? 0 : self.loop_index++;
  
      // Hide widget by timeout
      setTimeout(function() {
        self.hideWidget();
        // Schedule next loop
        setTimeout(function() {
          self.rotateWidget();
        }, self.settings.rotateDelay);
      }, self.settings.displayLength);
    },
  
    // Bind close button
    eventClose: function() {
      var self = this;
      self.closeButton.addEventListener("click", function(e) {
        self.hideWidget();
      });
    },
  
    // Detect mobile device
    isMobile: function() {
      return (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
        navigator.userAgent.match(/Opera Mini/i) ||
        navigator.userAgent.match(/IEMobile/i) ||
        navigator.userAgent.match(/webOS/i)
      );
    },
  
    // Shuffle array
    shuffleArray: function(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }
  };
  
  // Widget settings
  fomowidget.settings = {
    hideOnMobile: false,
    intialDelay: 6000,
    displayLength: 6000,
    rotateDelay: 4000,
    widgetCss:
      "#cp-purchase-notification{display:none;bottom:20px;left:20px;position:fixed;z-index:99999}#cp-purchase-notification #cp-widget-close{cursor:pointer;opacity:.2;background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQxLjc1NnB4IiBoZWlnaHQ9IjQxLjc1NnB4IiB2aWV3Qm94PSIwIDAgNDEuNzU2IDQxLjc1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDEuNzU2IDQxLjc1NjsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTI3Ljk0OCwyMC44NzhMNDAuMjkxLDguNTM2YzEuOTUzLTEuOTUzLDEuOTUzLTUuMTE5LDAtNy4wNzFjLTEuOTUxLTEuOTUyLTUuMTE5LTEuOTUyLTcuMDcsMEwyMC44NzgsMTMuODA5TDguNTM1LDEuNDY1DQoJCWMtMS45NTEtMS45NTItNS4xMTktMS45NTItNy4wNywwYy0xLjk1MywxLjk1My0xLjk1Myw1LjExOSwwLDcuMDcxbDEyLjM0MiwxMi4zNDJMMS40NjUsMzMuMjJjLTEuOTUzLDEuOTUzLTEuOTUzLDUuMTE5LDAsNy4wNzENCgkJQzIuNDQsNDEuMjY4LDMuNzIxLDQxLjc1NSw1LDQxLjc1NWMxLjI3OCwwLDIuNTYtMC40ODcsMy41MzUtMS40NjRsMTIuMzQzLTEyLjM0MmwxMi4zNDMsMTIuMzQzDQoJCWMwLjk3NiwwLjk3NywyLjI1NiwxLjQ2NCwzLjUzNSwxLjQ2NHMyLjU2LTAuNDg3LDMuNTM1LTEuNDY0YzEuOTUzLTEuOTUzLDEuOTUzLTUuMTE5LDAtNy4wNzFMMjcuOTQ4LDIwLjg3OHoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K);width:12px;height:12px;background-size:cover;}#cp-purchase-notification #cp-widget-close:hover{opacity:1}",
    widgetHtml:
      '<div id=cp-purchase-notification class="cp-purchase-notification animate__animated"><div class="static"><div id="cp-widget-inner" class="cp-widget-inner"></div><span id=cp-widget-close class="cp-widget-close"></span></div></div>'
  };

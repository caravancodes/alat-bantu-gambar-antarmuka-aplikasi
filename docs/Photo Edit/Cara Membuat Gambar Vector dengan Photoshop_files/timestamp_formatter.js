/*
 * Timestamp formatter that doesnt rely on Cookie & prototype.js
 * copied from hosted3
 */

var TimestampFormatter = (function() {
  var enabled = true,
      SECONDS = 1000,
      MINUTES = 60 * SECONDS,
      HOURS = 60 * MINUTES,
      DAYS = 24 * HOURS;

  function formatTimestamp(timestamp, format) {
    var date = new Date();
    date.setTime(parseInt(timestamp * 1000));

    return date.format(format);
  }

  function replaceTimestamp(element) {
    var timestamp = element.getAttribute('data-value'),
        format = element.getAttribute('data-format');

    if(timestamp && format) {
      element.innerHTML = formatTimestamp(timestamp, format);
    }
  }

  function findAndFormat(context) {
    var elements;

    if (typeof context != "undefined") {
      fixDateRepetition(context);
    }
    else {
     // elements = $$('span.timestamp');
    }
    elements = document.getElementsByTagName('span');

    for (i = 0; i < elements.length; i++) {
      var el = elements[i];
      // if has classname 'timestamp'
      if( el.className.search('/timestamp/') ) {
        replaceTimestamp(el);
      }
    }
  }

  function formatTitle() {
    var tempElement = new Element('div').update(document.title);
    findAndFormat(tempElement);
    document.title = tempElement.innerHTML;
  }

  function disableFormatter() {
    enabled = false;
  }

  function enableFormatter() {
    enabled = true;
  }

  function fixDateRepetition(context) {
  }

  return {
    initialize: function() {
      if (enabled) {
        findAndFormat();
      }
      else {
        // Prolong cookie lifetime
        disableFormatter();
      }
    },

    format: function(context) {
      if (enabled) {
        findAndFormat(context);
      }
    },

    forceFormat: findAndFormat,

    fixDateRepetition: fixDateRepetition,

    disable: disableFormatter,
    enable: enableFormatter
  };
})();

if(window.addEventListener) {
  window.addEventListener("load", function() {
      // loaded
    TimestampFormatter.initialize.bind(TimestampFormatter);
  }, false);
}
else {
  window.attachEvent("onload", function() {
      // loaded
    TimestampFormatter.initialize();
  }, false);
}

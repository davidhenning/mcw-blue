define(["jquery"], function ($){
    var exports = {};

    exports.load = function (context) {
        var item, module, parameters;

        $('[data-module]', context).each(function(index) {
            module = $(this).data('module');
            parameters = $(this).data('module-parameters') || '';
            parameters = parameters.split(',');
            parameters.unshift(this);
            
            require([module], function (module) {
              module.init.apply(module, parameters);
            });
        });
  };

  return exports;
});
(function(window, undefined) {
    var window = window;
    var document = window.document;
    var app = {
        module : {
            gui : require('nw.gui'),
            fs : require('fs')
        },
        view : {
            main : window
        },
        model : {
            main : this
        }
    };

    app.fn = {
        dirWindow : function(id) {
            if (!app.view.hasOwnProperty('dir_window')) {
                // app.view.dir_window = new require('dir_window_model')();
                var model = new require('dir_window_model')();
                app.view.dir_window = new require('dir_window_view')(document, id, model);
                app.view.dir_window.init();
            }
            return app.view.dir_window;
        },
        switchPage : function(id, method) {
            var nextPage = document.querySelector('#' + id);
            if (nextPage === undefined) return;
            var inClass = '', outClass = '';
            switch(method) {
                case 1:
                    inClass = 'page-moveFromRight';
                    outClass = 'page-moveToLeft';
                    break;
                case 2:
                    inClass = 'page-moveFromLeft';
                    outClass = 'page-moveToRight';
            }
            var currentPage = document.querySelector('.page-current');
            currentPage.classList.add(outClass);
            nextPage.classList.add('page-current');
            nextPage.classList.add(inClass);
            setTimeout(function() {
                currentPage.classList.remove('page-current');
                currentPage.classList.remove(outClass);
                nextPage.classList.remove(inClass);
            }, 1000);
        }
    };

    // export app
    window.app = app;

    /*
    * custom functions
    */
    // appendHTML
    HTMLElement.prototype.appendHTML = function(html) {
        var divTemp = document.createElement("div"), nodes = null,
            fragment = document.createDocumentFragment();
        divTemp.innerHTML = html;
        nodes = divTemp.childNodes;
        for (var i=0, length=nodes.length; i<length; i+=1) {
           fragment.appendChild(nodes[i].cloneNode(true));
        }
        this.appendChild(fragment);
        nodes = null;
        fragment = null;
    };

})(window);
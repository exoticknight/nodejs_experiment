(function(window, undefined) {
    var window = window;
    var document = window.document;
    var app = {
        module : {
            gui : require('nw.gui'),
            fs : require('fs')
        },
        events : {},
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
            nextPage.classList.add('page-current');
            currentPage.addEventListener('webkitAnimationEnd', function(e) {
                currentPage.classList.remove('page-current');
                currentPage.classList.remove(outClass);
                currentPage.removeEventListener('webkitAnimationEnd');
            });
            nextPage.addEventListener('webkitAnimationEnd', function(e) {
                nextPage.classList.add('page-current');
                nextPage.classList.remove(inClass);
                nextPage.removeEventListener('webkitAnimationEnd');
            });
            currentPage.classList.add(outClass);
            nextPage.classList.add(inClass);
        },
        showPanel : function(id) {
            var self = this;
            var panel = document.querySelector('#' + id);
            var mask = document.querySelector('#mask');
            mask.style.visibility = 'visible';
            panel.classList.add('panel-current');
            mask.addEventListener('click', function() {
                self.hidePanel(id);
            });
        },
        hidePanel : function(id) {
            var panel = document.querySelector('#' + id);
            var mask = document.querySelector('#mask');
            mask.style.visibility = 'hidden';
            panel.classList.remove('panel-current');
            mask.removeEventListener('click');
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

    function saveFile() {}

})(window);
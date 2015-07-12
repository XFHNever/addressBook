(function(window, $, undefined){
	var mockService = {
        attachEvent: function attachEvent() {
            $('#download').on('click', function() {
                $.ajax({
                    url: '/download',
                    type: 'get',
                    success: function(data) {
                        alert('test');
                        window.location = '/download';
                    }
                });
            });
        },
        init: function init() {
            this.attachEvent();
        }
    }

    mockService.init();

}(window || this, jQuery, undefined));
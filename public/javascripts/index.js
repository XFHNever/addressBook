(function(window, $, undefined){
	var mockService = {
        attachEvent: function attachEvent() {
            $('#download').on('click', function() {
                $.ajax({
                    url: '/download',
                    type: 'post',
                    success: function(data) {
                        alert('test');
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
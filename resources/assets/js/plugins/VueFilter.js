const VueFilter = {
    install: (Vue) => {
        Vue.filter('capitalize', function (value) {
            if (!value) return '';
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1)
        });

        Vue.filter('highlight', function (value, query) {
            if (!query) {
                return value;
            }
            const iQuery = new RegExp(query, "ig");
            return value.toString().replace(iQuery, function (matchedTxt, a, b) {
                return ('<span class=\'font-weight-bold\'>' + matchedTxt + '</span>');
            });
        });
    }
};

export default VueFilter;
const VueFilter = {
    install: (Vue) => {
        Vue.filter('capitalize', function (value) {
            if (!value) return '';
            value = value.toString();
            return value.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ');
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

        Vue.filter('transform-role', function (value) {
            if (!value) return '';
            return value.toString().replace('_', ' ');
        });

        Vue.filter('number', function (value, invalidValue = 0) {
            if (!value) return invalidValue;
            return value.toLocaleString();
        });
    }
};

export default VueFilter;
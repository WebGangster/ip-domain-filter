const ipRangeFilter = (ip, ipRange) => {
    let from = ipRange[0];
    let to = ipRange[1];

    if (ip && from && to) {
        let ips = [ip.split('.'), from.split('.'), to.split('.')];
        for (let i = 0; i < ips.length; i++) {
            for (let j = 0; j < ips[i].length; j++) {
                ips[i][j] = parseInt(ips[i][j], 10);
            }
            ips[i] = (ips[i][0] << 24) + (ips[i][1] << 16) + (ips[i][2] << 8) + (ips[i][3]);
        }
        if (ips[0] >= ips[1] && ips[0] <= ips[2]) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = ipRangeFilter;

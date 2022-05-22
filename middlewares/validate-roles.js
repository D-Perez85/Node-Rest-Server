const { response } = require('express')

const isAdminRole = ( req, res = response, next ) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: "Can't verify role before validating token"
            });
        }
    const { rol, nombre } = req.user;
        if ( rol !== 'ADMIN_ROLE' ) {
            return res.status(401).json({
                msg: `${ nombre } is not an administrador - Acces Denied`
            });
        }
    next();
}
const hasRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: "Can't verify role before validating token"
            });
        }
        if ( !roles.includes( req.user.rol ) ) {
            return res.status(401).json({
                msg: `Services requires uno of these roles ${ roles }`
            });
        }
        next();
    }
}
module.exports = { isAdminRole, hasRole}
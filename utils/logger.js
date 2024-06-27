import winston from "winston";

// Organizo los niveles y les doy color
const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
    },
    colors: {
        fatal: 'red',
        error: 'red',      
        warning: 'yellow',
        info: 'blue',
        debug: 'cyan'
    }
};

// Aplico los colores personalizados globalmente
winston.addColors(customLevels.colors);

// Implemento el obj de config. (cómo quiero que trabajen cada uno de los niveles)
const logger = winston.createLogger({
    levels: customLevels.levels,
    // Cómo quiero que se guarden
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(), 
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            level: 'warning',
            filename: './warnings.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'error',
            filename: './errors.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'fatal',
            filename: './errors.log',
            format: winston.format.simple()
        })
    ]
});

// Middleware para agregar logger a la solicitud
export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`Método ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    next();
};

export default logger;

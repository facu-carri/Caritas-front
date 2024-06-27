export function parseExchangeStateName(state) {
  const mappedValues = {
    'NotConfirmed': 'No Confirmado',
    'Rejected': 'Rechazado',
    'RejectedByDislike': 'Rechazado por disgusto',
    'RejectedByPreference': 'Rechazado por prefierencia a esperar por una mejor oferta',
    'RejectedByTrust': 'Rechazado por falta de confianza al intercambiador',
    'Accepted': 'Aceptado',
    'Canceled': 'Cancelado',
    'Completed': 'Completado',
    'NotComplitedByDislike': 'No completado por disgusto de un producto del intercambio',
    'NotComplitedByNonAttendance': 'No completado por ausencia de un intercambiador',


    
    'Rechazado por disgusto': 'RejectedByDislike',
    'Rechazado por prefierencia a esperar por una mejor oferta': 'RejectedByPreference',
    'Rechazado por falta de confianza al intercambiador': 'RejectedByTrust',
  };
  return mappedValues[state] || state;
}
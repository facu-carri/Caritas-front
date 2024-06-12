export function parseExchangeStateName(state) {
  const mappedValues = {
    'NotConfirmed': 'No Confirmado',
    'Rejected': 'Rechazado',
    'Accepted': 'Aceptado',
    'Canceled': 'Cancelado',
    'Completed': 'Completado',
    'NotComplitedByDislike': 'No completado por disgusto de un producto del intercambio',
    'NotComplitedByNonAttendance': 'No completado por ausencia de un intercambiador'
  };
  return mappedValues[state] || state;
}
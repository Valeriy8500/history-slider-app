import './slider.scss';

export const Slider = () => {
  const numPoints = 6; // Количество точек
  const radius = 265; // Радиус круга
  const centerX = 262; // Центр круга (X-координата)
  const centerY = 262; // Центр круга (Y-координата)

  const points = Array.from({ length: numPoints }).map((_, index) => {
    const angle = (index / numPoints) * 2 * Math.PI; // Угол для каждой точки
    const x = centerX + radius * Math.cos(angle); // Вычисление X-координаты
    const y = centerY + radius * Math.sin(angle); // Вычисление Y-координаты

    return (
      <div
        key={index}
        className="point"
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    );
  });

  return (
    <div className='slider-container'>
      <div className='slider'>
        <div className="circle">{points}</div>
        <div className='line horizontal-line'></div>
        <div className='line vertical-line'></div>
      </div>

      <div className='events-container'>
        <div>13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды</div>
      </div>
    </div>
  );
}
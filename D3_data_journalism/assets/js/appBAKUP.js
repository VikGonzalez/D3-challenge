// // DECLARAR VARIABLES DEL SVG PARA PODER MODIFICARSE POSTERIORMENTE
// let svgWidth = 960;
// let svgHeight = 500;

// // CREAR ESPACIO DE TRABAJO
// // SELECCIONAR BODY
// // APPENDEAR EL SVG EN EL BODY
// // CREAR DIMENSIONES DEL SVG
// let svg = d3.select("#scatter")
//     .append("svg")
//     .attr("width",svgWidth)
//     .attr("height", svgHeight);
// // ANADIR MARGENES AL SVG
// let margin = {
//     top: 60,
//     right: 60,
//     bottom: 60,
//     left: 60
// }
// // CENTRAR EL SVG RESPECTO A LOS MARGENES
// let chartWidth = svgWidth - margin.right - margin.left;
// let chartHeight = svgHeight - margin.top - margin.bottom;
// // CREAR ESPACIO DEL TAG DONDE SE INSERTARA EL GRAFICO
// //PASAR A STRING LITERAL PARA CONCATENAR LOS VALORES
// let chartGroup = svg.append("g")
//     .attr("transform",`translate(${margin.left},${margin.top})`)

// // CARGAR LOS DATOS DEL CSV EN UNA PROMESA
// d3.csv("./data/data.csv").then(data=> {
//     console.log(data)
//     // ITERAR A TRAVES DE CADA COLUMNA
//     data.forEach(data=> {
//         data.smokes = +data.smokes;
//         data.age = +data.age;
//         data.state = +data.state

//     })

//     // CREAR FUNCIONES ESCALADORAS
//     let yLinearScale = d3.scaleLinear()
//         .domain([0, d3.max(data, data=>data.smokes)])
//         .range([chartHeight, 0]);

//     let xLinearScale = d3.scaleLinear()
//         .domain([d3.extent(data, data=>data.age)])
//         .range([0, chartWidth]);

//     // PINTAR EJES
//     let bottomAxis = d3.axisBottom(xLinearScale)
//     let leftAxis = d3.axisLeft(yLinearScale)

//     // CREAR GRUPO PARA EJE X Y EJE Y
//     chartGroup.append("g")
//         .classed("axis", true)
//         .call(leftAxis)
//     // TRANSFORM & TRANSLATE AL EJE X PARA QUE SE MUEVA AL EJE INFERIOR
//     chartGroup.append("g")
//         .classed("axis", true)
//         .attr("transform", `translate(0, ${chartHeight})`)
//         .call(bottomAxis)

//     // CREAR LINEA Y METERLA A SU PROPIO TAG
//     let drawLine = d3.line()
//     // INDICAR HACIA DONDE SE VA A MOVER LA LINEA//
//     // INSERTAR LOS VALORES DE NUESTRAS FUNCIONES ESCALADORAS
//     // INSERTAR LA FUNCION DEC CADA UNO DE LOS ELEMENTOS EN DATA
//         .x(data=>xLinearScale(data.age))
//         .y(data=>yLinearScale(data.smokes))

//     chartGroup.append("path")
//         .attr("d", drawLine(data))
//         .classed("line", true)

//     console.log(yLinearScale(100))

// })




// // CARGAR LOS DATOS DEL CSV EN UNA PROMESA
// d3.csv("./data/data.csv").then(data=> {
//     console.log(data)
//     // ITERAR A TRAVES DE CADA COLUMNA
//     data.forEach(data=> {
//         data.smokes = +data.smokes;
//         data.age = +data.age;
//         data.state = +data.state

//     })

//     // CREAR ESPACIO DE TRABAJO
//     // SELECCIONAR BODY
//     // APPENDEAR EL SVG EN EL BODY
//     // CREAR DIMENSIONES DEL SVG

//     // REMOVER SVG SI EXISTE
//     let emptysvg = d3.select("#scatter").select("svg");
//         if(!emptysvg.empty()){
//             emptysvg.remove();
//     }
    
    
//     let svgWidth = d3.select("#scatter").node().getBoundingClientRect().width;
//     console.log("Test", svgWidth);

//     let svgHeight = svgWidth;
//     console.log("Test", svgHeight);
    
//     // ANADIR MARGENES AL SVG
//     let margin = {
//         top: 50,
//         right: 50,
//         bottom: 50,
//         left: 50
//     };

//     // CENTRAR EL SVG RESPECTO A LOS MARGENES
//     let chartWidth = svgWidth - margin.right - margin.left;
//     let chartHeight = svgHeight - margin.top - margin.bottom;
    
//     // CREAR ESPACIO DEL TAG DONDE SE INSERTARA EL GRAFICO
//     let svg = d3.select("#scatter").append("svg")
//         .attr("height", svgHeight)
//         .attr("width", svgWidth)
    
//     //CREAR GRUP Y PASAR A STRING LITERAL PARA CONCATENAR LOS VALORES
//     let chartGroup = svg.append("g")
//         .attr("transform",`translate(${margin.left},${margin.top})`)
    
//     // CREAR FUNCIONES ESCALADORAS
//     let yScale = d3.scaleLinear()
//         .domain([0, d3.max(data, data=>data.poverty)])
//         .range([chartHeight, 0]);


//     let xScale = d3.scaleLinear()
//         .domain([d3.extent(data, data=>data.healthcare)])
//         .range([0, chartWidth]);

//     // PINTAR EJES
//     let xAxis = d3.axisBottom(xScale)
//     let yAxis = d3.axisLeft(yScale)

//     // TRANSFORM & TRANSLATE AL EJE X PARA QUE SE MUEVA AL EJE INFERIOR
//     chartGroup.append("g")
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(xAxis);
//     // CREAR GRUPO PARA EJE X Y EJE Y
//     chartGroup.append("g")
//         .call(yAxis)


//     // CREATE STATE TEXT
//     let stateGroup = chartGroup.append("text")
//     .selectAll("tspan")
//     .data(data)
//     .enter()
//     .append("tspan")
//     .attr("class","stateText")
//     .attr("x", d=> xScale(d.poverty))
//     .attr("y", d=> yScale(d.healthcare) +4)
//     .text(d=> d.abbr);

//     let abbre = data.map(d=> d.abbr);
//     console.log("All Abbr", abbre)

//     // CREAR CIRCULOS
//     let circleGroup = chartGroup.selectAll("circle")
//     .data("data")
//     .enter()
//     .append("circle")
//     .attr("class", "stateCircle")
//     .attr("cx", d=> xScale(d.poverty))
//     .attr("cy", d=> yScale(d.healthcare))
//     .attr("r", "12")
//     .attr("opacity", ".5");

//     // INSERTAR TEXTO
//     let circleText = chartGroup.append("text")
//     .selectAll("tspan")
//     .data(data)
//     .enter()
//     .append("tspan")

    
//     let toolTip = d3.tip()
//     .attr("class", "d3-tip")
//     .offset([80, -60])
//     .html(function(d) {
//         return(`Healthcare (%): ${d.healthcare}<br>Poverty (%): ${d.poverty}</br>${d.abbr}`)
//     });

//     chartGroup.call(toolTip);

//     })

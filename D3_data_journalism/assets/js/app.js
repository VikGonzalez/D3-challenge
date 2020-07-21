// // HACER RESPONSIVO EL SITIO CON WINDOW
function makeResponsive() {

    // SI EL SVG NO ESTA VACIO CUANDO SE LLENE EL BROWSER CARGA,
    // REMOVERLO Y REEMPLAZARLO CON UNA VERSION REAJUSTADA DEL CHART

    let svgArea = d3.select("#scatter").select("svg");
    // REMOVER SVG SI EXISTE
        if(!svgArea.empty()) {
            svgArea.remove();
    }
    let svgWidth = d3.select("#scatter").node().getBoundingClientRect().width;
    console.log("Test", svgWidth);

    let svgHeight = svgWidth;
    console.log("Test", svgHeight);

// //     // PARAMETROS DEL SVG SON DEFINIDOS POR LAS MEDIDAS ACTUALES DEL NAVEGADOR
//     let svgHeight = window.innerHeight
//     let svgWidth = window.innerWidth

//     // ANADIR MARGENES AL SVG
    let margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

//     // CENTRAR EL SVG RESPECTO A LOS MARGENES
    let chartHeight = svgHeight - margin.top - margin.bottom;
    let chartWidth = svgWidth - margin.right - margin.left;
    
//     // CREAR UN CONTENEDOR PARA EL SVG
//     // APPENDEAR UN GRUPO SVG QUE CONTENGA NUESTRO CHART
    let svg = d3.select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
    
       //CREAR GROUP Y PASAR A STRING LITERAL PARA CONCATENAR LOS VALORES
    let chartGroup = svg.append("g")
        .attr("transform",`translate(${margin.left}, ${margin.top})`);

// // CARGAR LOS DATOS DEL CSV EN UNA PROMESA
    d3.csv("./data/data.csv").then(function(csvData) {
        console.log(csvData)
    // ITERAR A TRAVES DE CADA COLUMNA
    csvData.forEach(d=> {
        d.smokes = +d.smokes;
        d.age = +d.age;
        d.state = +d.state

    })
    // CREAR FUNCIONES ESCALADORAS
    let yScale = d3.scaleLinear()
        .domain([8, d3.max(csvData, d=>d.smokes)])
        .range([chartHeight, 0]);

    let xScale = d3.scaleLinear()
        .domain([30, d3.max(csvData, d=> d.age)])
        .range([0, chartWidth]);

//     // CREAR AXES
    let yAxis = d3.axisLeft(yScale);
    let xAxis = d3.axisBottom(xScale);

//     // APPENDEAR AXES EN EL CHARTGROUP
//    CREAR GRUPO PARA EJE Y
    chartGroup.append("g")
        // .classed("axis", true)
        .call(yAxis)
//     // TRANSFORM & TRANSLATE AL EJE X PARA QUE SE MUEVA AL EJE INFERIOR
    chartGroup.append("g")
        // .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)







    // CREAR CIRCULOS
    let circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d=> xScale(d.age))
    .attr("cy", d=> yScale(d.smokes))
    .attr("r", "20")
    .attr("opacity", ".5")
    .attr("class", "stateCircle");

    //  INSERTAR ABREVIACIONES DE LOS ESTADOS EN LOS CIRCULOS 
    chartGroup
        .append("g")
        .selectAll("text")
        .data(csvData)
        .enter()
        .append("text")
        .text(d=>d.abbr)
        .attr("x", d => xScale(d.age))
        .attr("y", d=> yScale(d.smokes))
        .classed(".stateText", true)
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "13px")
        .attr("fill", "white");
        // Hasta aqui funciona bien

    // // CREATE STATE TEXT
    // let stateGroup = chartGroup.append("text")
    // .selectAll("tspan")
    // .data(csvData)
    // .enter()
    // .append("tspan")
    // .attr("class","stateText")
    // .attr("x", d=> xScale(d.age))
    // .attr("y", d=> yScale(d.smokes) +4)
    // .text(d=> d.abbr);

    // let abbr = csvData.map(d=> d.abbr);
    // console.log("All Abbr", abbr)


//     // CREAR TOOLTIPS
    let toolTip = d3.tip()
    // VINCULAR CON LA CLASE D3-TIP DEL D3STYLE FILE
        .attr("class", "d3-tip")
        .offset([80, 60])
        .html(function(d){
            return(`${d.state}<br>Age${d.age}<br>${d.smokes}`);
        });
    // INSERTAR TOOLTIPS EN EL CHART
    chartGroup.call(toolTip);

    // CREAR CLICK LISTENER
    circlesGroup.on("click", d => {
        toolTip.show(d, this)
    })

    // CREAR EVENT LISTENERS
    // MOUSEOVER PARA MOSTRAR LOS TOOLTIPS
    // circlesGroup.on("mouseover", d=> {
    //     toolTip.show(d.this);
    // })
    // MOUSE OUT PARA OCULTAR LOS TOOLTIPS
        .on("mouseout", d=> {
            toolTip.hide(d);

    // CREAR AXES LABELS
    chartGroup.append("text")
    .attr("transform", rotate(-90))
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (chartHeight/2))
    .attr("dy", "1em")
    .text("Smokers (%)");

    chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 3}, ${chartHeight + margin.top + 30})`)
    .text("Age (%)");
    });
    }).catch(function(error){
        console.log(error);
    })
    };
;

// // CUANDO EL BROWSER CARGA, MEK RESPONSIVE() ES LLAMADO
makeResponsive();
// // CUANDO LA VENTANA DEL BROWSER AJUSTA TAMAÑO, MAKERESPONSIVE () ES LLAMADO
d3.select(window).on("resize", makeResponsive);

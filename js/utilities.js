// Función para definir color de botones de forma aleatoria (con un array)
export function btnColorDef() {
    const colors = [
        "btn btn-primary",
        "btn btn-secondary",
        "btn btn-success",
        "btn btn-warning",
        "btn btn-info",
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}

// Función para definir color de botones de forma aleatoria (con switch)
// export function btnColorDef() {
//     switch (Math.floor(Math.random() * 5) + 1) {
//         case 1:
//             return "btn btn-primary";
//         case 2:
//             return "btn btn-secondary";
//         case 3:
//             return "btn btn-success";
//         case 4:
//             return "btn btn-warning";
//         case 5:
//             return "btn btn-info";
//         default:
//             return "btn btn-light";
//     };
// };

// Función para definir color de fondo de imágenes
export function imgColorDef() {
    const colors = [
        "bg-primary",
        "bg-secondary",
        "bg-success",
        "bg-warning",
        "bg-info",
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}
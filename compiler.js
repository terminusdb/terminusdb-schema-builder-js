"use strict";
/*const ts = require("typescript")

const source = "let x: string  = 'ciccio'";

let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

console.log(JSON.stringify(result));
*/
//const ts = require("typescript")
//const fs = require("fs")
exports.__esModule = true;
var ts = require("typescript");
var fs = require("fs");
/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames, options) {
    // Build a program using the set of root file names in fileNames
    //console.log('generateDocumentation')
    var program = ts.createProgram(fileNames, options);
    // Get the checker, we will use it to find more about classes
    var checker = program.getTypeChecker();
    
    var output = [];
    // Visit every sourceFile in the program
    for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
        var sourceFile = _a[_i];
        if (!sourceFile.isDeclarationFile) {
            // Walk the tree to search for classes
            ts.forEachChild(sourceFile, visit);
        }
    }
    // print out the doc
    fs.writeFileSync("./classes_test.json", JSON.stringify(output, undefined, 4));
    return;
    /** visit nodes finding exported classes */
    function visit(node) {
        //console.log(node.name)
        // Only consider exported nodes
        if (!isNodeExported(node)) {
            return;
        }
        if(ts.isEnumDeclaration(node) && node.name.text){
          
            output.push(serializeEnum(node));

        }else if (ts.isInterfaceDeclaration(node)){

            //var symbol = checker.getSymbolAtLocation(node.name);
            output.push(serializeEnum(node));
           // console.log("isInterfaceDeclaration", node.name)

        }else if (ts.isClassDeclaration(node) && node.name) {
            // This is a top level class, get its symbol symbol.members
            var symbol = checker.getSymbolAtLocation(node.name);
            if (symbol) {
                output.push(serializeClass(symbol));
            }
            // No need to walk any further, class expressions/inner declarations
            // cannot be exported
        }
        else if (ts.isModuleDeclaration(node)) {
            // This is a namespace, visit its children
            ts.forEachChild(node, visit);
        }
    }
    /** Serialize a symbol into a json object */
    function serializeSymbol(symbol) {
        //getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
        var name009 = checker.getTypeOfSymbolAtLocation(symbol,symbol.valueDeclaration)//: string;

       // const kind = symbol.valueDeclaration ? symbol.valueDeclaration.kind : undefined
        var test = checker.getDefaultFromTypeParameter(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
        
        var type = checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
        var name = symbol.getName()
        if(name==="idgen"){
            type = JSON.parse(type)
        }

        //add optional value 
        if(symbol.valueDeclaration ){
            if(symbol.valueDeclaration.questionToken){
                type = [ 'Optional', type ]
            }else if (symbol.valueDeclaration.initializer){
            //array of litteralexpression
                //var ss = checker.getTypeFromTypeNode(symbol.valueDeclaration.initializer)
                //var startV = checker.typeToString(symbol.valueDeclaration.initializer)

            }
        }

        

       // var checker.isOptionalParameter(node: ParameterDeclaration);

       //var opt =  checker.isOptionalParameter(symbol.valueDeclaration);

        return {
            name: name,
            type: type//checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))
        };
    }

    function serializeEnum(node){
        var details = {"@type":"Enum", "@id":node.name.text}
        const members = node.members;

        node.members.forEach((value)=>{
            var {name, type} = serializeSymbol(value.symbol)
            details[name] = type
        
        })
        return details
    }
    /** Serialize a class symbol information */
    function serializeClass(symbol) {
        
        var classDetails = serializeSymbol(symbol);
        var details = {'@id':classDetails.name, '@type':classDetails.type}
        //var prop ={}
       
        symbol.members.forEach((value)=>{
            var {name, type} = serializeSymbol(value)
            var  typeValue = //classDetails.name
            details[name] = type
        
        })//.forEachChild(serializeSymbol)
        
       var parentType = symbol.valueDeclaration.parent.classifiableNames
       
       if(parentType.has("WoqlDocument")){
           details["@type"] = 'Document'
       }

       
        //details.properties = prop
        
        // Get the construct signatures
        var constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
       // var te= constructorType.getConstructSignatures()
        /*details.constructors = constructorType
            .getConstructSignatures()
            .map(serializeSignature);*/
        return details;
    }
    /** Serialize a signature (call or construct) */
    function serializeSignature(signature) {
        return {
            parameters: signature.parameters.map(serializeSymbol),
            returnType: checker.typeToString(signature.getReturnType()),
            //documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
        };
    }
    /** True if this is visible outside this file, false otherwise */
    function isNodeExported(node) {
        return ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0 ||
            (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile));
    }
}
generateDocumentation(process.argv.slice(2), {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
});

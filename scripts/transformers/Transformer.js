// $Id: Transformer.js,v 1.27 2006/03/24 17:28:44 vnagarjuna Exp $ -->

// Copyright 2005-2006 Nagarjuna Venna <vnagarjuna@yahoo.com>
// See http://lekhini.org/scripts/padma-license.txt

// Changes Copyright 2006 Veeven <veeven at gmail dot com>
// See http://lekhini.org/license.txt

//Transformer

//Input/output methods
Transformer.method_RTS	  = 0;
Transformer.method_Unicode  = 1;
Transformer.method_Unknown  = 8;


//Class names for non-dynamic font encodings
Transformer.className_Unicode = Unicode;
Transformer.className_RTS	 = RTS;

function Transformer(input, output, rtsWritingStyle, rtsSunnaStyle) {
	this.input = input;
	this.output = output;

	if (this.output == Transformer.method_RTS)
		this.outputWriter = RTS.getRTSWriter(rtsWritingStyle, rtsSunnaStyle);
	else if (this.output == Transformer.method_Unicode)
		this.outputWriter = Unicode.getUnicodeWriter();
}

Transformer.createTransformer = function (input, output, rtsWritingStyle, rtsSunnaStyle) {
	if (!Transformer.isValidOutputMethod(output) || !Transformer.isValidInputMethod(input))
		return null;
	if (input == Transformer.method_RTS)
		return new RTSTransformer(input, output);
	if (output == Transformer.method_RTS)
		return new Transformer(input, output, rtsWritingStyle, rtsSunnaStyle);
	return new Transformer(input, output);
}

Transformer.prototype.getInputMethod = function () { return this.input; }

Transformer.prototype.getOutputMethod = function () { return this.output; }

Transformer.isValidInputMethod = function (method) {
	return method == Transformer.method_RTS || method == Transformer.method_Unicode || method == Transformer.method_Unknown; }

Transformer.isValidOutputMethod = function (method) { return method == Transformer.method_RTS || method == Transformer.method_Unicode; }

Transformer.prototype.convert = function (text) {
	//Convert to internal format from inputMethod
	var output = "";
	var parser = null;

	if (this.input == Transformer.method_Unicode || this.input == Transformer.method_Unknown) {
		parser = new Parser(text, Transformer.className_Unicode);
	}

	while (parser.more())
		output += this.toOutputFormat(parser.next());

	return output + this.outputWriter.cleanup();
}

Transformer.prototype.toOutputFormat = function (syllable) { return this.outputWriter.transformFromPadma(syllable); }

Transformer.prototype.setOutputScript = function (scriptCode) {
	if (scriptCode >= Padma.script_MAXSCRIPTS || this.output != Transformer.method_Unicode)
		return false;
	this.outputWriter.setScript(scriptCode);
	this.scriptCode = scriptCode;
	return true;
}

Unicode.initialize();

// $Id: Syllable.js,v 1.3 2005/10/19 23:15:20 vnagarjuna Exp $ -->

// Copyright 2005 Nagarjuna Venna <vnagarjuna@yahoo.com>
// See http://lekhini.org/scripts/padma-license.txt

// See http://lekhini.org/license.txt

function Syllable() {
	this.body = "";
	this.prefix_gunintam = "";
	this.gunintam = "";
	this.prefix_vattu = "";
	this.vowel_modifier = "";
	this.cons_modifier = "";
}

Syllable.prototype.update = function (str, type, prefix, suffix) {
	for(var i = 0; i < str.length; ++i) {
		if (i != 0)
			type = Padma.getType(str.charAt(i));
		if (type == Padma.type_accu || type == Padma.type_digit || type == Padma.type_hallu || type == Padma.type_unknown)
			this.body += str.charAt(i);
		else if (type == Padma.type_half_form) {
			if (suffix)
				this.body = str.charAt(i) + this.body;
			else this.body += str.charAt(i);
		}
		else if (type == Padma.type_gunintam) {
			if (prefix)
				this.prefix_gunintam += str.charAt(i);
			else this.gunintam += str.charAt(i);
		}
		else if (type == Padma.type_vattu) {
			if (prefix)
				this.prefix_vattu += str.charAt(i);
			else this.body += str.charAt(i);
		}
		else if (type == Padma.type_accu_mod)
			this.vowel_modifier += str.charAt(i);
		else if (type == Padma.type_hallu_mod)
			this.cons_modifier += str.charAt(i);
	}
}

Syllable.prototype.getLength = function() {
	return this.body.length + this.prefix_gunintam.length + this.gunintam.length + this.prefix_vattu.length + this.cons_modifier.length + this.vowel_modifier.length;
}

Syllable.prototype.foldGunintam = function() {
	this.gunintam += this.prefix_gunintam;
	this.prefix_gunintam = "";
}

Syllable.prototype.foldConsonantModifiers = function() {
	this.body += this.prefix_vattu;
	this.prefix_vattu = "";
}

Syllable.prototype.getSyllable = function() { return this.body + this.cons_modifier + this.gunintam + this.vowel_modifier; }

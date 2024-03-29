!function(){"use strict";let t;let{Array:e,Object:s,Math:n,Error:i,Uint8Array:r,Uint16Array:a,Uint32Array:h,Int32Array:l,DataView:c,TextEncoder:o,crypto:p,postMessage:d}=globalThis,u=[];for(let t=0;256>t;t++){let e=t;for(let t=0;8>t;t++)1&e?e=e>>>1^3988292384:e>>>=1;u[t]=e}class f{constructor(t){this.crc=t||-1}append(t){let e=0|this.crc;for(let s=0,n=0|t.length;n>s;s++)e=e>>>8^u[255&(e^t[s])];this.crc=e}get(){return~this.crc}}let g={concat(t,e){if(0===t.length||0===e.length)return t.concat(e);let s=t[t.length-1],n=g.getPartial(s);return 32===n?t.concat(e):g._shiftRight(e,n,0|s,t.slice(0,t.length-1))},bitLength(t){let e=t.length;if(0===e)return 0;let s=t[e-1];return 32*(e-1)+g.getPartial(s)},clamp(t,e){if(32*t.length<e)return t;let s=(t=t.slice(0,n.ceil(e/32))).length;return e&=31,s>0&&e&&(t[s-1]=g.partial(e,t[s-1]&2147483648>>e-1,1)),t},partial:(t,e,s)=>32===t?e:(s?0|e:e<<32-t)+1099511627776*t,getPartial:t=>n.round(t/1099511627776)||32,_shiftRight(t,e,s,n){for(void 0===n&&(n=[]);e>=32;e-=32)n.push(s),s=0;if(0===e)return n.concat(t);for(let i=0;i<t.length;i++)n.push(s|t[i]>>>e),s=t[i]<<32-e;let i=t.length?t[t.length-1]:0,r=g.getPartial(i);return n.push(g.partial(e+r&31,e+r>32?s:n.pop(),1)),n}},w={bytes:{fromBits(t){let e;let s=g.bitLength(t)/8,n=new r(s);for(let i=0;s>i;i++)3&i||(e=t[i/4]),n[i]=e>>>24,e<<=8;return n},toBits(t){let e=[],s,n=0;for(s=0;s<t.length;s++)n=n<<8|t[s],(3&s)==3&&(e.push(n),n=0);return 3&s&&e.push(g.partial(8*(3&s),n)),e}}},y={sha1:function(t){t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()}};y.sha1.prototype={blockSize:512,reset:function(){return this._h=this._init.slice(0),this._buffer=[],this._length=0,this},update:function(t){"string"==typeof t&&(t=w.utf8String.toBits(t));let e=this._buffer=g.concat(this._buffer,t),s=this._length,n=this._length=s+g.bitLength(t);if(n>9007199254740991)throw new i("Cannot hash more than 2^53 - 1 bits");let r=new h(e),a=0;for(let t=this.blockSize+s-(this.blockSize+s&this.blockSize-1);n>=t;t+=this.blockSize)this._block(r.subarray(16*a,16*(a+1))),a+=1;return e.splice(0,16*a),this},finalize:function(){let t=this._buffer,e=this._h;t=g.concat(t,[g.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(n.floor(this._length/4294967296)),t.push(0|this._length);t.length;)this._block(t.splice(0,16));return this.reset(),e},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(t,e,s,n)=>t>19?t>39?t>59?t>79?void 0:e^s^n:e&s|e&n|s&n:e^s^n:e&s|~e&n,_S:(t,e)=>e<<t|e>>>32-t,_block:function(t){let s=this._h,i=e(80);for(let e=0;16>e;e++)i[e]=t[e];let r=s[0],a=s[1],h=s[2],l=s[3],c=s[4];for(let t=0;79>=t;t++){16>t||(i[t]=this._S(1,i[t-3]^i[t-8]^i[t-14]^i[t-16]));let e=this._S(5,r)+this._f(t,a,h,l)+c+i[t]+this._key[n.floor(t/20)]|0;c=l,l=h,h=this._S(30,a),a=r,r=e}s[0]=s[0]+r|0,s[1]=s[1]+a|0,s[2]=s[2]+h|0,s[3]=s[3]+l|0,s[4]=s[4]+c|0}};let _={getRandomValues(t){let e=new h(t.buffer),s=t=>{let e=987654321;return()=>((((e=36969*(65535&e)+(e>>16)&4294967295)<<16)+(t=18e3*(65535&t)+(t>>16)&4294967295)&4294967295)/4294967296+.5)*(n.random()>.5?1:-1)};for(let i,r=0;r<t.length;r+=4){let t=s(4294967296*(i||n.random()));i=987654071*t(),e[r/4]=4294967296*t()|0}return t}},m={importKey:t=>new m.hmacSha1(w.bytes.toBits(t)),pbkdf2(t,e,s,n){let r,a,h,l,o;if(s=s||1e4,0>n||0>s)throw new i("invalid params to pbkdf2");let p=1+(n>>5)<<2,d=new ArrayBuffer(p),u=new c(d),f=0;for(e=w.bytes.toBits(e),o=1;(p||1)>f;o++){for(r=a=t.encrypt(g.concat(e,[o])),h=1;s>h;h++)for(a=t.encrypt(a),l=0;l<a.length;l++)r[l]^=a[l];for(h=0;(p||1)>f&&h<r.length;h++)u.setInt32(f,r[h]),f+=4}return d.slice(0,n/8)},hmacSha1:class{constructor(t){let e=this._hash=y.sha1,s=[[],[]],n=e.prototype.blockSize/32;this._baseHash=[new e,new e],t.length>n&&(t=e.hash(t));for(let e=0;n>e;e++)s[0][e]=909522486^t[e],s[1][e]=1549556828^t[e];this._baseHash[0].update(s[0]),this._baseHash[1].update(s[1]),this._resultHash=new e(this._baseHash[0])}reset(){this._resultHash=new this._hash(this._baseHash[0]),this._updated=!1}update(t){this._updated=!0,this._resultHash.update(t)}digest(){let t=this._resultHash.finalize(),e=new this._hash(this._baseHash[1]).update(t).finalize();return this.reset(),e}encrypt(t){if(this._updated)throw new i("encrypt on already updated hmac called!");return this.update(t),this.digest(t)}}},b="Invalid pasword",k={name:"PBKDF2"},v=s.assign({hash:{name:"HMAC"}},k),z=s.assign({iterations:1e3,hash:{name:"SHA-1"}},k),C=["deriveBits"],S=[8,12,16],B=[16,24,32],I=[0,0,0,0],D=void 0!==p,V=D&&void 0!==p.subtle,H=w.bytes,K=class{constructor(t){this._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],this._tables[0][0][0]||this._precompute();let e=this._tables[0][4],s=this._tables[1],n=t.length,r,a,h,l=1;if(4!==n&&6!==n&&8!==n)throw new i("invalid aes key size");for(this._key=[a=t.slice(0),h=[]],r=n;4*n+28>r;r++){let t=a[r-1];(r%n==0||8===n&&r%n==4)&&(t=e[t>>>24]<<24^e[t>>16&255]<<16^e[t>>8&255]<<8^e[255&t],r%n==0&&(t=t<<8^t>>>24^l<<24,l=l<<1^283*(l>>7))),a[r]=a[r-n]^t}for(let t=0;r;t++,r--){let n=a[3&t?r:r-4];h[t]=4>=r||4>t?n:s[0][e[n>>>24]]^s[1][e[n>>16&255]]^s[2][e[n>>8&255]]^s[3][e[255&n]]}}encrypt(t){return this._crypt(t,0)}decrypt(t){return this._crypt(t,1)}_precompute(){let t,e,s;let n=this._tables[0],i=this._tables[1],r=n[4],a=i[4],h=[],l=[];for(let t=0;256>t;t++)l[(h[t]=t<<1^283*(t>>7))^t]=t;for(let c=t=0;!r[c];c^=e||1,t=l[t]||1){let l=t^t<<1^t<<2^t<<3^t<<4;l=l>>8^255&l^99,r[c]=l,a[l]=c;let o=16843009*h[s=h[e=h[c]]]^65537*s^257*e^16843008*c,p=257*h[l]^16843008*l;for(let t=0;4>t;t++)n[t][c]=p=p<<24^p>>>8,i[t][l]=o=o<<24^o>>>8}for(let t=0;5>t;t++)n[t]=n[t].slice(0),i[t]=i[t].slice(0)}_crypt(t,e){if(4!==t.length)throw new i("invalid aes block size");let s=this._key[e],n=s.length/4-2,r=[0,0,0,0],a=this._tables[e],h=a[0],l=a[1],c=a[2],o=a[3],p=a[4],d,u,f,g=t[0]^s[0],w=t[e?3:1]^s[1],y=t[2]^s[2],_=t[e?1:3]^s[3],m=4;for(let t=0;n>t;t++)d=h[g>>>24]^l[w>>16&255]^c[y>>8&255]^o[255&_]^s[m],u=h[w>>>24]^l[y>>16&255]^c[_>>8&255]^o[255&g]^s[m+1],f=h[y>>>24]^l[_>>16&255]^c[g>>8&255]^o[255&w]^s[m+2],_=h[_>>>24]^l[g>>16&255]^c[w>>8&255]^o[255&y]^s[m+3],m+=4,g=d,w=u,y=f;for(let t=0;4>t;t++)r[e?3&-t:t]=p[g>>>24]<<24^p[w>>16&255]<<16^p[y>>8&255]<<8^p[255&_]^s[m++],d=g,g=w,w=y,y=_,_=d;return r}},A=class{constructor(t,e){this._prf=t,this._initIv=e,this._iv=e}reset(){this._iv=this._initIv}update(t){return this.calculate(this._prf,t,this._iv)}incWord(t){if((t>>24&255)==255){let e=t>>16&255,s=t>>8&255,n=255&t;255===e?(e=0,255===s?(s=0,255===n?n=0:++n):++s):++e,t=0+(e<<16)+(s<<8)+n}else t+=16777216;return t}incCounter(t){0===(t[0]=this.incWord(t[0]))&&(t[1]=this.incWord(t[1]))}calculate(t,e,s){let n;if(!(n=e.length))return[];let i=g.bitLength(e);for(let i=0;n>i;i+=4){this.incCounter(s);let n=t.encrypt(s);e[i]^=n[0],e[i+1]^=n[1],e[i+2]^=n[2],e[i+3]^=n[3]}return g.clamp(e,i)}},R=m.hmacSha1;class W{constructor(t,e,n){s.assign(this,{password:t,signed:e,strength:n-1,pendingInput:new r(0)})}async append(t){if(this.password){let s=P(t,0,S[this.strength]+2);await (async(t,e,s)=>{await G(t,s,P(e,0,S[t.strength]));let n=P(e,S[t.strength]),r=t.keys.passwordVerification;if(r[0]!=n[0]||r[1]!=n[1])throw new i(b)})(this,s,this.password),this.password=null,this.aesCtrGladman=new A(new K(this.keys.key),e.from(I)),this.hmac=new R(this.keys.authentication),t=P(t,S[this.strength]+2)}return U(this,t,new r(t.length-10-(t.length-10)%16),0,10,!0)}flush(){let t=this.pendingInput,e=P(t,0,t.length-10),s=P(t,t.length-10),n=new r(0);if(e.length){let t=H.toBits(e);this.hmac.update(t);let s=this.aesCtrGladman.update(t);n=H.fromBits(s)}let i=!0;if(this.signed){let t=P(H.fromBits(this.hmac.digest()),0,10);for(let e=0;10>e;e++)t[e]!=s[e]&&(i=!1)}return{valid:i,data:n}}}class T{constructor(t,e){s.assign(this,{password:t,strength:e-1,pendingInput:new r(0)})}async append(t){let s=new r(0);this.password&&(s=await (async(t,e)=>{var s;let n=(s=new r(S[t.strength]),D&&"function"==typeof p.getRandomValues?p.getRandomValues(s):_.getRandomValues(s));return await G(t,e,n),L(n,t.keys.passwordVerification)})(this,this.password),this.password=null,this.aesCtrGladman=new A(new K(this.keys.key),e.from(I)),this.hmac=new R(this.keys.authentication));let n=new r(s.length+t.length-t.length%16);return n.set(s,0),U(this,t,n,s.length,0)}flush(){let t=new r(0);if(this.pendingInput.length){let e=this.aesCtrGladman.update(H.toBits(this.pendingInput));this.hmac.update(e),t=H.fromBits(e)}let e=P(H.fromBits(this.hmac.digest()),0,10);return{data:L(t,e),signature:e}}}function U(t,e,s,n,i,a){let h;let l=e.length-i;for(t.pendingInput.length&&(e=L(t.pendingInput,e),s=((t,e)=>{if(e&&e>t.length){let s=t;(t=new r(e)).set(s,0)}return t})(s,l-l%16)),h=0;l-16>=h;h+=16){let i=H.toBits(P(e,h,h+16));a&&t.hmac.update(i);let r=t.aesCtrGladman.update(i);a||t.hmac.update(r),s.set(H.fromBits(r),h+n)}return t.pendingInput=P(e,h),s}async function G(t,e,n){let i=(t=>{if(void 0===o){let e=new r((t=unescape(encodeURIComponent(t))).length);for(let s=0;s<e.length;s++)e[s]=t.charCodeAt(s);return e}return new o().encode(t)})(e),a=await (D&&V&&"function"==typeof p.subtle.importKey?p.subtle.importKey("raw",i,v,!1,C):m.importKey(i)),h=await (async(t,e,s)=>D&&V&&"function"==typeof p.subtle.deriveBits?await p.subtle.deriveBits(t,e,s):m.pbkdf2(e,t.salt,z.iterations,s))(s.assign({salt:n},z),a,8*(2*B[t.strength]+2)),l=new r(h);t.keys={key:H.toBits(P(l,0,B[t.strength])),authentication:H.toBits(P(l,B[t.strength],2*B[t.strength])),passwordVerification:P(l,2*B[t.strength])}}function L(t,e){let s=t;return t.length+e.length&&((s=new r(t.length+e.length)).set(t,0),s.set(e,t.length)),s}function P(t,e,s){return t.subarray(e,s)}class E{constructor(t,e){s.assign(this,{password:t,passwordVerification:e}),F(this,t)}append(t){if(this.password){let e=j(this,t.subarray(0,12));if(this.password=null,e[11]!=this.passwordVerification)throw new i(b);t=t.subarray(12)}return j(this,t)}flush(){return{valid:!0,data:new r(0)}}}class M{constructor(t,e){s.assign(this,{password:t,passwordVerification:e}),F(this,t)}append(t){let e,s;if(this.password){this.password=null;let n=p.getRandomValues(new r(12));n[11]=this.passwordVerification,(e=new r(t.length+n.length)).set(x(this,n),0),s=12}else e=new r(t.length),s=0;return e.set(x(this,t),s),e}flush(){return{data:new r(0)}}}function j(t,e){let s=new r(e.length);for(let n=0;n<e.length;n++)s[n]=q(t)^e[n],O(t,s[n]);return s}function x(t,e){let s=new r(e.length);for(let n=0;n<e.length;n++)s[n]=q(t)^e[n],O(t,e[n]);return s}function F(t,e){t.keys=[305419896,591751049,878082192],t.crcKey0=new f(t.keys[0]),t.crcKey2=new f(t.keys[2]);for(let s=0;s<e.length;s++)O(t,e.charCodeAt(s))}function O(t,e){var s;t.crcKey0.append([e]),t.keys[0]=~t.crcKey0.get(),t.keys[1]=J(t.keys[1]+(255&t.keys[0])),t.keys[1]=J(n.imul(t.keys[1],134775813)+1),t.crcKey2.append([t.keys[1]>>>24]),t.keys[2]=~t.crcKey2.get()}function q(t){var e;let s=2|t.keys[2];return 255&n.imul(s,1^s)>>>8}function J(t){return 4294967295&t}let N="deflate",Q="inflate",X="Invalid signature";class Y{constructor(t,{signature:e,password:n,signed:i,compressed:r,zipCrypto:a,passwordVerification:h,encryptionStrength:l},{chunkSize:c}){let o=!!n;s.assign(this,{signature:e,encrypted:o,signed:i,compressed:r,inflate:r&&new t({chunkSize:c}),crc32:i&&new f,zipCrypto:a,decrypt:o&&a?new E(n,h):new W(n,i,l)})}async append(t){return this.encrypted&&t.length&&(t=await this.decrypt.append(t)),this.compressed&&t.length&&(t=await this.inflate.append(t)),(!this.encrypted||this.zipCrypto)&&this.signed&&t.length&&this.crc32.append(t),t}async flush(){let t,e=new r(0);if(this.encrypted){let t=this.decrypt.flush();if(!t.valid)throw new i(X);e=t.data}if((!this.encrypted||this.zipCrypto)&&this.signed){let e=new c(new r(4).buffer);if(t=this.crc32.get(),e.setUint32(0,t),this.signature!=e.getUint32(0,!1))throw new i(X)}return this.compressed&&(e=await this.inflate.append(e)||new r(0),await this.inflate.flush()),{data:e,signature:t}}}class Z{constructor(t,{encrypted:e,signed:n,compressed:i,level:r,zipCrypto:a,password:h,passwordVerification:l,encryptionStrength:c},{chunkSize:o}){s.assign(this,{encrypted:e,signed:n,compressed:i,deflate:i&&new t({level:r||5,chunkSize:o}),crc32:n&&new f,zipCrypto:a,encrypt:e&&a?new M(h,l):new T(h,c)})}async append(t){let e=t;return this.compressed&&t.length&&(e=await this.deflate.append(t)),this.encrypted&&e.length&&(e=await this.encrypt.append(e)),(!this.encrypted||this.zipCrypto)&&this.signed&&t.length&&this.crc32.append(t),e}async flush(){let t,e=new r(0);if(this.compressed&&(e=await this.deflate.flush()||new r(0)),this.encrypted){e=await this.encrypt.append(e);let s=this.encrypt.flush();t=s.signature;let n=new r(e.length+s.data.length);n.set(e,0),n.set(s.data,e.length),e=n}return(!this.encrypted||this.zipCrypto)&&this.signed&&(t=this.crc32.get()),{data:e,signature:t}}}let $={init(e){var s,n;let i;e.scripts&&e.scripts.length&&importScripts.apply(void 0,e.scripts);let r=e.options;self.initCodec&&self.initCodec(),r.codecType.startsWith(N)?i=self.Deflate:r.codecType.startsWith(Q)&&(i=self.Inflate),s=i,n=e.config,t=r.codecType.startsWith(N)?new Z(s,r,n):r.codecType.startsWith(Q)?new Y(s,r,n):void 0},append:async e=>({data:await t.append(e.data)}),flush:()=>t.flush()};function tt(t,e,n){return class{constructor(i){let a=this;a.codec=new t(s.assign({},e,i)),n(a.codec,t=>{if(a.pendingData){let e=a.pendingData;a.pendingData=new r(e.length+t.length),a.pendingData.set(e,0),a.pendingData.set(t,e.length)}else a.pendingData=new r(t)})}append(t){return this.codec.push(t),i(this)}flush(){return this.codec.push(new r(0),!0),i(this)}};function i(t){if(t.pendingData){let e=t.pendingData;return t.pendingData=null,e}return new r(0)}}addEventListener("message",async t=>{let e=t.data,s=e.type,n=$[s];if(n)try{e.data&&(e.data=new r(e.data));let t=await n(e)||{};if(t.type=s,t.data)try{t.data=t.data.buffer,d(t,[t.data])}catch{d(t)}else d(t)}catch(t){d({type:s,error:{message:t.message,stack:t.stack}})}}),self.initCodec=()=>{let{Deflate:t,Inflate:e}=((t,e={},s)=>({Deflate:tt(t.Deflate,e.deflate,s),Inflate:tt(t.Inflate,e.inflate,s)}))(pako,{deflate:{raw:!0},inflate:{raw:!0}},(t,e)=>t.onData=e);self.Deflate=t,self.Inflate=e}}();
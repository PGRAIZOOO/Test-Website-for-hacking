function addToCart() {

    const bpQty = parseInt(document.getElementById('BALLPEN_NUMERIC').value);
    
    if (bpQty > 0) {
        const color = document.getElementById('BALLPEN_COLOER_CMBBX').value;
        if (!color) return alert("Select ballpen color");
        addOrUpdateItem(`Ballpen (${color})`, 12, bpQty);
    }

    const fQty = parseInt(document.getElementById('FOLDER_NUMERIC').value);
    if (fQty > 0) {
        const size = document.getElementById('FOLDER_CMBBX').value;
        if (!size) return alert("Select folder size");
        const price = { "S": 40, "M": 55, "L": 70 }[size];
        addOrUpdateItem(`Folder (${size})`, price, fQty);
    }

    const mQty = parseInt(document.getElementById('MARKER_NUMERIC').value);
    if (mQty > 0) {
        const type = document.getElementById('MARKER_CMBBX').value;
        if (!type) return alert("Select marker type");
        const price = (type === "Marker") ? 35 : 45;
        addOrUpdateItem(`Marker (${type})`, price, mQty);
    }

    const uQty = parseInt(document.getElementById('SCHOOL_UNI_NUMERIC').value);
    if (uQty > 0) {
        const size = document.getElementById('ComboBox1').value;
        if (!size) return alert("Select school uniform size");
        const prices = { "XS": 450, "S": 480, "M": 520, "L": 560, "XL": 600 };
        addOrUpdateItem(`School Uniform (${size})`, prices[size], uQty);
    }
    
    const checkItems = [
        ['NOTEBOOK_CHCKBX', 'NOTEBOOK_NUMERIC', 'Notebook', 70],
        ['RULER_CHCKBX', 'RULER_NUMERIC', 'Ruler', 25],
        ['SCISSORS_CHCKBX', 'SCISSORS_NUMERIC', 'Scissors', 40],
        ['SHARPENER_CHCKBX', 'SHARPENER_NUMERIC', 'Sharpener', 15],
        ['HIGHLIGHTERS_CHCKBX', 'HIGHLIGHTERS_NUMERIC', 'Highlighter', 25],
        ['COLOER_PENCIL_CHCKCBX', 'COLOR_PENCIL_NUMERIC', 'Color Pencil', 150],
        ['SCHOOL_ID_CHKBX', 'SCHOOL_ID_NUMERIC', 'School ID Lace', 50],
        ['MONGOL_CHCKBX', 'MONGOL_NUMERIC', 'Mongol Pencil', 12],
        ['COLOREDPAPER_CHCKBX', 'COLOREDPAPER_NUMERIC', 'Colored Paper', 20],
        ['GRAPHING_CHCKBX', 'GRAPHING_NUMERIC', 'Graphing Paper', 20],
        ['CARTOLINA_CHCKBX', 'CARTOLINA_NUMERIC', 'Cartolina', 35],
        ['MANILA_CHCKBX', 'MANILA_NUMERIC', 'Manila Paper', 25],
        ['GLUE_CHCKBX', 'GLUE_NUMERIC', 'Glue', 20],
        ['YELLOWPAD_CHCKBX', 'YELLOWPAD_NUMERIC', 'Yellow Pad', 45],
        ['CORRECTION_CHCKBX', 'CORRECTION_NUMERIC', 'Correction Tape', 15]
    ];

    checkItems.forEach(([chkId, numId, name, price]) => {
        const qty = parseInt(document.getElementById(numId).value);
        if (document.getElementById(chkId).checked && qty > 0) {
            addOrUpdateItem(name, price, qty);
        }
    });
}

function addOrUpdateItem(itemName, unitPrice, quantity) {
    const listbox = document.getElementById('SCHOOLITEMS_LISTBOXBOX');
    let found = false;
    for (let i = 0; i < listbox.options.length; i++) {
        if (listbox.options[i].text.startsWith(itemName)) {
            let parts = listbox.options[i].text.split(' x ');
            let newQty = parseInt(parts[1]) + quantity;
            listbox.options[i].text = `${itemName} P${unitPrice} x ${newQty}`;
            found = true; break;
        }
    }
    if (!found) {
        let opt = document.createElement("option");
        opt.text = `${itemName} P${unitPrice} x ${quantity}`;
        listbox.add(opt);
    }
}

function calculateTotal() {
    const listbox = document.getElementById('SCHOOLITEMS_LISTBOXBOX');
    let total = 0;
    for (let i = 0; i < listbox.options.length; i++) {
        let text = listbox.options[i].text;
        let qty = parseInt(text.split(' x ')[1]);
        let price = parseInt(text.split(' P')[1].split(' x ')[0]);
        total += price * qty;
    }
    const cash = parseFloat(document.getElementById('CASH_TXTBX').value) || 0;
    document.getElementById('TOTAL_LBL_SHOWPRICE').innerText = "₱" + total.toFixed(2);
    document.getElementById('Label11').innerText = "₱" + (cash - total).toFixed(2);
}

function clearCart() {
    document.getElementById('SCHOOLITEMS_LISTBOXBOX').innerHTML = "";
    calculateTotal();
}

function removeSelected() {
    const lb = document.getElementById('SCHOOLITEMS_LISTBOXBOX');
    if (lb.selectedIndex !== -1) lb.remove(lb.selectedIndex);
    calculateTotal();
}

function printReceipt() {
    const listbox = document.getElementById('SCHOOLITEMS_LISTBOXBOX');
    const name = document.getElementById('studName').value;
    const grade = document.getElementById('gradeLvl').value;
    let res = `Name: ${name}\nGrade: ${grade}\n\nItems:\n`;
    for(let i=0; i<listbox.options.length; i++) res += listbox.options[i].text + "\n";
    res += `\nTotal: ${document.getElementById('TOTAL_LBL_SHOWPRICE').innerText}`;
    
    const blob = new Blob([res], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'receipt.txt';
    a.click();
}






const libraryData = {
    'Non-Fiction': [
        { id: 1000, title: "Educated", author: "Tara Westover" },
        { id: 1001, title: "Born a Crime", author: "Trevor Noah" },
        { id: 1002, title: "Man’s Search for Meaning", author: "Viktor E. Frankl" },
        { id: 1003, title: "The Art of War", author: "Sun Tzu" },
        { id: 1004, title: "Quiet: The Power of Introverts", author: "Susan Cain" },
        { id: 1005, title: "Drive", author: "Daniel H. Pink" },
        { id: 1006, title: "How to Win Friends and Influence People", author: "Dale Carnegie" },
        { id: 1007, title: "Make Your Bed", author: "William H. McRaven" },
        { id: 1008, title: "The Psychology of Money", author: "Morgan Housel" },
        { id: 1009, title: "Thinking in Bets", author: "Annie Duke" },
        { id: 1010, title: "Steve Jobs", author: "Walter Isaacson" },
        { id: 1011, title: "Einstein: His Life and Universe", author: "Walter Isaacson" },
        { id: 1012, title: "Bad Blood", author: "John Carreyrou" },
        { id: 1013, title: "The Sixth Extinction", author: "Elizabeth Kolbert" },
        { id: 1014, title: "Start With Why", author: "Simon Sinek" },
        { id: 1015, title: "The Lean Startup", author: "Eric Ries" },
        { id: 1016, title: "Deep Work", author: "Cal Newport" },
        { id: 1017, title: "Digital Minimalism", author: "Cal Newport" },
        { id: 1018, title: "Factfulness", author: "Hans Rosling" },
        { id: 1019, title: "Why We Sleep", author: "Matthew Walker" },
        { id: 1020, title: "The Wright Brothers", author: "David McCullough" },
        { id: 1021, title: "Into the Wild", author: "Jon Krakauer" },
        { id: 1022, title: "The Man Who Knew Infinity", author: "Robert Kanigel" },
        { id: 1023, title: "Cosmos", author: "Carl Sagan" }
    ],
    'Fiction': [
        { id: 1024, title: "Pride and Prejudice", author: "Jane Austen" },
        { id: 1025, title: "Jane Eyre", author: "Charlotte Brontë" },
        { id: 1026, title: "Wuthering Heights", author: "Emily Brontë" },
        { id: 1027, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
        { id: 1028, title: "1984", author: "George Orwell" },
        { id: 1029, title: "Animal Farm", author: "George Orwell" },
        { id: 1030, title: "The Catcher in the Rye", author: "J.D. Salinger" },
        { id: 1031, title: "The Hobbit", author: "J.R.R. Tolkien" },
        { id: 1032, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
        { id: 1033, title: "Harry Potter and the Sorcerer’s Stone", author: "J.K. Rowling" },
        { id: 1034, title: "The Hunger Games", author: "Suzanne Collins" },
        { id: 1035, title: "Divergent", author: "Veronica Roth" },
        { id: 1036, title: "Percy Jackson and the Lightning Thief", author: "Rick Riordan" },
        { id: 1037, title: "The Maze Runner", author: "James Dashner" },
        { id: 1038, title: "The Alchemist", author: "Paulo Coelho" },
        { id: 1039, title: "Life of Pi", author: "Yann Martel" },
        { id: 1040, title: "The Book Thief", author: "Markus Zusak" },
        { id: 1041, title: "The Chronicles of Narnia", author: "C.S. Lewis" },
        { id: 1042, title: "The Little Prince", author: "Antoine de Saint-Exupéry" },
        { id: 1043, title: "Frankenstein", author: "Mary Shelley" },
        { id: 1044, title: "Twilight", author: "Stephenie Meyer" },
        { id: 1045, title: "Me Before You", author: "Jojo Moyes" },
        { id: 1046, title: "The Fault in Our Stars", author: "John Green" },
        { id: 1047, title: "Outlander", author: "Diana Gabaldon" },
        { id: 1048, title: "Call Me by Your Name", author: "André Aciman" },
        { id: 1049, title: "The Time Traveler’s Wife", author: "Audrey Niffenegger" },
        { id: 1050, title: "It Ends with Us", author: "Colleen Hoover" },
        { id: 1051, title: "Red, White & Royal Blue", author: "Casey McQuiston" }
    ],
    'Science': [
        { id: 1092, title: "A Short History of Nearly Everything", author: "Bill Bryson" },
        { id: 1093, title: "The Gene: An Intimate History", author: "Siddhartha Mukherjee" },
        { id: 1094, title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot" },
        { id: 1095, title: "Surely You’re Joking, Mr. Feynman!", author: "Richard Feynman" },
        { id: 1096, title: "Astrophysics for Young People in a Hurry", author: "Neil deGrasse Tyson" },
        { id: 1097, title: "The Double Helix", author: "James D. Watson" },
        { id: 1098, title: "On the Origin of Species", author: "Charles Darwin" },
        { id: 1099, title: "The Selfish Gene", author: "Richard Dawkins" },
        { id: 1100, title: "Physics of the Impossible", author: "Michio Kaku" },
        { id: 1101, title: "Black Holes and Time Warps", author: "Kip Thorne" },
        { id: 1102, title: "The Elegant Universe", author: "Brian Greene" },
        { id: 1103, title: "A Brief History of Time", author: "Stephen Hawking" },
        { id: 1104, title: "The Structure of Scientific Revolutions", author: "Thomas Kuhn" },
        { id: 1105, title: "The Fabric of the Cosmos", author: "Brian Greene" },
        { id: 1106, title: "The Disappearing Spoon", author: "Sam Kean" },
        { id: 1107, title: "The Poisoner’s Handbook", author: "Deborah Blum" },
        { id: 1108, title: "Napoleon’s Buttons", author: "Penny Le Couteur & Jay Burreson" },
        { id: 1109, title: "Longitude", author: "Dava Sobel" },
        { id: 1110, title: "The Immense Journey", author: "Loren Eiseley" },
        { id: 1111, title: "The Invention of Science", author: "David Wootton" },
        { id: 1112, title: "The Gene Machine", author: "Venki Ramakrishnan" },
        { id: 1113, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari" },
        { id: 1114, title: "Homo Deus: A Brief History of Tomorrow", author: "Yuval Noah Harari" },
        { id: 1115, title: "Why Evolution is True", author: "Jerry A. Coyne" },
        { id: 1116, title: "The Sixth Extinction", author: "Elizabeth Kolbert" },
        { id: 1117, title: "The Emperor of All Maladies", author: "Siddhartha Mukherjee" },
        { id: 1118, title: "The Hidden Life of Trees", author: "Peter Wohlleben" },
        { id: 1119, title: "Lab Girl", author: "Hope Jahren" },
        { id: 1120, title: "The Immune System", author: "Peter Parham" },
        { id: 1121, title: "The Body: A Guide for Occupants", author: "Bill Bryson" },
        { id: 1122, title: "The Future of Humanity", author: "Michio Kaku" }
    ],
    'Math': [
        { id: 1123, title: "Engineering Mathematics", author: "K.A. Stroud" },
        { id: 1124, title: "Advanced Engineering Mathematics", author: "Erwin Kreyszig" },
        { id: 1125, title: "Calculus", author: "James Stewart" },
        { id: 1126, title: "Calculus Made Easy", author: "Silvanus P. Thompson" },
        { id: 1127, title: "Linear Algebra and Its Applications", author: "Gilbert Strang" },
        { id: 1128, title: "Introduction to Linear Algebra", author: "Gilbert Strang" },
        { id: 1129, title: "Discrete Mathematics and Its Applications", author: "Kenneth Rosen" },
        { id: 1130, title: "Differential Equations with Applications and Historical Notes", author: "George F. Simmons" },
        { id: 1131, title: "Applied Mathematics for Engineering Technicians", author: "L.H. Hann" },
        { id: 1132, title: "Probability and Statistics for Engineering and the Sciences", author: "Jay Devore" },
        { id: 1133, title: "Engineering Drawing with CAD Applications", author: "David Goetsch" },
        { id: 1134, title: "Statics and Dynamics", author: "R.C. Hibbeler" },
        { id: 1135, title: "Strength of Materials", author: "Bansal" },
        { id: 1136, title: "Introduction to Algorithms", author: "Thomas H. Cormen et al." },
        { id: 1137, title: "Structure and Interpretation of Computer Programs", author: "Abelson & Sussman" },
        { id: 1138, title: "The Art of Problem Solving, Vol. 1", author: "Richard Rusczyk" },
        { id: 1139, title: "The Art of Problem Solving, Vol. 2", author: "Richard Rusczyk" },
        { id: 1140, title: "How to Solve It", author: "George Pólya" },
        { id: 1141, title: "Applied Numerical Methods with MATLAB", author: "Steven C. Chapra" },
        { id: 1142, title: "Signals and Systems", author: "Alan V. Oppenheim" },
        { id: 1143, title: "Fundamentals of Engineering Thermodynamics", author: "Moran & Shapiro" },
        { id: 1144, title: "Introduction to Fluid Mechanics", author: "Fox, McDonald & Pritchard" },
        { id: 1145, title: "Mechanics of Materials", author: "Beer, Johnston & DeWolf" },
        { id: 1146, title: "Digital Design", author: "M. Morris Mano" },
        { id: 1147, title: "Computer Organization and Design", author: "David A. Patterson & John L. Hennessy" },
        { id: 1148, title: "Probability and Random Processes", author: "Geoffrey Grimmett & David Stirzaker" },
        { id: 1149, title: "Introduction to Electrodynamics", author: "David J. Griffiths" },
        { id: 1150, title: "Signals, Systems, and Transforms", author: "Charles L. Phillips & John Parr" },
        { id: 1151, title: "Numerical Methods for Engineers", author: "Steven C. Chapra & Raymond P. Canale" },
        { id: 1152, title: "Advanced Engineering Physics", author: "R.K. Gaur & S.L. Gupta" },
        { id: 1153, title: "Mathematical Methods for Physicists", author: "George B. Arfken & Hans J. Weber" }
    ],
    'History': [
        { id: 1154, title: "Guns, Germs, and Steel", author: "Jared Diamond" },
        { id: 1155, title: "A People’s History of the United States", author: "Howard Zinn" },
        { id: 1156, title: "The Diary of a Young Girl", author: "Anne Frank" },
        { id: 1157, title: "The Rise and Fall of the Third Reich", author: "William L. Shirer" },
        { id: 1158, title: "The Cold War: A New History", author: "John Lewis Gaddis" },
        { id: 1159, title: "The Crusades: The Authoritative History", author: "Thomas Asbridge" },
        { id: 1160, title: "The Silk Roads", author: "Peter Frankopan" },
        { id: 1161, title: "Postwar: A History of Europe Since 1945", author: "Tony Judt" },
        { id: 1162, title: "Team of Rivals", author: "Doris Kearns Goodwin" },
        { id: 1163, title: "1776", author: "David McCullough" },
        { id: 1164, title: "The World Is Flat", author: "Thomas L. Friedman" },
        { id: 1165, title: "The Roman Empire", author: "Isaac Asimov" },
        { id: 1166, title: "The Philippines: A Past Revisited", author: "Renato Constantino" },
        { id: 1167, title: "The Making of a Nation", author: "Renato Constantino" },
        { id: 1168, title: "Noli Me Tángere", author: "José Rizal" },
        { id: 1169, title: "El Filibusterismo", author: "José Rizal" },
        { id: 1170, title: "The Katipunan and the Revolution", author: "Teodoro A. Agoncillo" },
        { id: 1171, title: "A History of the World in 100 Objects", author: "Neil MacGregor" },
        { id: 1172, title: "The Age of Revolution", author: "Eric Hobsbawm" },
        { id: 1173, title: "The Age of Empire", author: "Eric Hobsbawm" },
        { id: 1174, title: "The Age of Extremes", author: "Eric Hobsbawm" },
        { id: 1175, title: "The Histories", author: "Herodotus" },
        { id: 1176, title: "The History of the Peloponnesian War", author: "Thucydides" },
        { id: 1177, title: "Jerusalem: The Biography", author: "Simon Sebag Montefiore" },
        { id: 1178, title: "SPQR: A History of Ancient Rome", author: "Mary Beard" },
        { id: 1179, title: "Gulag: A History", author: "Anne Applebaum" },
        { id: 1180, title: "The Black Jacobins", author: "C.L.R. James" },
        { id: 1181, title: "A Distant Mirror", author: "Barbara W. Tuchman" },
        { id: 1182, title: "The Liberation Trilogy", author: "Rick Atkinson" },
        { id: 1183, title: "Vietnam: A History", author: "Stanley Karnow" },
        { id: 1184, title: "The Rise of Theodore Roosevelt", author: "Edmund Morris" },
        { id: 1185, title: "Theodore Rex", author: "Edmund Morris" },
        { id: 1186, title: "The Coldest Winter", author: "David Halberstam" },
        { id: 1187, title: "The Guns of August", author: "Barbara W. Tuchman" }
    ],
    'Romance': [
        { id: 1188, title: "Pride and Prejudice", author: "Jane Austen" },
        { id: 1189, title: "Jane Eyre", author: "Charlotte Brontë" },
        { id: 1190, title: "Wuthering Heights", author: "Emily Brontë" },
        { id: 1191, title: "Me Before You", author: "Jojo Moyes" },
        { id: 1192, title: "The Fault in Our Stars", author: "John Green" },
        { id: 1193, title: "The Time Traveler’s Wife", author: "Audrey Niffenegger" },
        { id: 1194, title: "Call Me by Your Name", author: "André Aciman" },
        { id: 1195, title: "Outlander", author: "Diana Gabaldon" },
        { id: 1196, title: "The Notebook", author: "Nicholas Sparks" },
        { id: 1197, title: "Love, Rosie", author: "Cecelia Ahern" },
        { id: 1198, title: "The Rosie Project", author: "Graeme Simsion" },
        { id: 1199, title: "One Day", author: "David Nicholls" },
        { id: 1200, title: "Eleanor & Park", author: "Rainbow Rowell" },
        { id: 1201, title: "It Ends with Us", author: "Colleen Hoover" },
        { id: 1202, title: "The Hating Game", author: "Sally Thorne" },
        { id: 1203, title: "Beach Read", author: "Emily Henry" },
        { id: 1204, title: "Red, White & Royal Blue", author: "Casey McQuiston" },
        { id: 1205, title: "Normal People", author: "Sally Rooney" },
        { id: 1206, title: "Before We Were Strangers", author: "Renée Carlino" },
        { id: 1207, title: "Twilight", author: "Stephenie Meyer" },
        { id: 1208, title: "Pushing the Limits", author: "Katie McGarry" },
        { id: 1209, title: "The Simple Wild", author: "K.A. Tucker" },
        { id: 1210, title: "From Lukov with Love", author: "Marina Andrews" },
        { id: 1211, title: "Archer’s Voice", author: "Mia Sheridan" },
        { id: 1212, title: "The Deal", author: "Elle Kennedy" },
        { id: 1213, title: "The Chase", author: "Elle Kennedy" },
        { id: 1214, title: "It Ends with Us: Lily’s Story", author: "Colleen Hoover" },
        { id: 1215, title: "November 9", author: "Colleen Hoover" },
        { id: 1216, title: "Ugly Love", author: "Colleen Hoover" },
        { id: 1217, title: "Roomies", author: "Christina Lauren" },
        { id: 1218, title: "Love & Gelato", author: "Jenna Evans Welch" },
        { id: 1219, title: "The Perfect Hope", author: "Nora Roberts" },
        { id: 1220, title: "Vision in White", author: "Nora Roberts" },
        { id: 1221, title: "Born in Fire", author: "Lisa Marie Rice" },
        { id: 1222, title: "Beautiful Disaster", author: "Jamie McGuire" },
        { id: 1223, title: "Walking Disaster", author: "Jamie McGuire" }
    ]
};

function changeTab(category, btn) {
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const tableBody = document.getElementById('selectionBody');
    tableBody.innerHTML = ""; 

    const books = libraryData[category];

    if (books) {
        books.forEach(book => {
            const row = `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>
                        <button class="select-btn-cell" onclick="addToList(${book.id}, '${book.title.replace(/'/g, "\\'")}')">
                            SELECT
                        </button>
                    </td>
                </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

function addToList(id, title) {
    const borrowBody = document.getElementById('borrowBody');

    let exists = false;
    Array.from(borrowBody.rows).forEach(row => {
        if(row.cells[0].innerText == id) exists = true;
    });
    if(exists) return alert("Book already added!");

    const newRow = borrowBody.insertRow();
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td><input type="number" class="dgv-input" value="1"></td>
        <td><input type="number" class="dgv-input" value="7"></td>
        <td style="padding:0;"><button class="remove-btn" onclick="removeThisRow(this)">X</button></td>
    `;
}

function removeThisRow(btn) {
    const row = btn.closest('tr');
    row.remove();
}

function clearTable() {
    if (confirm("Clear all items from the borrowing list?")) {
        document.getElementById('borrowBody').innerHTML = "";
    }}

window.onload = function() {
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        changeTab('Non-Fiction', firstTab);
    }
};


async function saveEnrollment() {
    const gender = document.querySelector('input[name="gender"]:checked');
    const data = {
        surname:      document.getElementById("surname").value,
        firstname:    document.getElementById("firstname").value,
        middlename:   document.getElementById("middlename").value,
        bday:         document.getElementById("bday").value,
        gender:       gender ? gender.value : "N/A",
        address:      document.getElementById("address").value,
        s_contact:    document.getElementById("s_contact").value,
        s_email:      document.getElementById("s_email").value,
        p_surname:    document.getElementById("p_surname").value,
        p_firstname:  document.getElementById("p_firstname").value,
        p_middlename: document.getElementById("p_middlename").value,
        p_contact:    document.getElementById("p_contact").value,
        p_email:      document.getElementById("p_email").value,
        enroll_date:  document.getElementById("enroll_date").value,
    };
    const res = await fetch("/save_enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    alert(res.ok ? "Enrollment saved!" : "Error saving enrollment.");
}

async function saveStore() {
    const listbox = document.getElementById('SCHOOLITEMS_LISTBOXBOX');
    const items = [];
    let total = 0;

    for (let i = 0; i < listbox.options.length; i++) {
        const text = listbox.options[i].text;
        const name  = text.split(' P')[0];
        const price = parseInt(text.split(' P')[1].split(' x ')[0]);
        const qty   = parseInt(text.split(' x ')[1]);
        items.push({ name, price, qty });
        total += price * qty;
    }

    const data = {
        studName: document.getElementById("studName").value,
        gradeLvl: document.getElementById("gradeLvl").value,
        items,
        total,
    };
    const res = await fetch("/save_store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    alert(res.ok ? `Purchase saved! Total: ₱${total}` : "Error saving purchase.");
}
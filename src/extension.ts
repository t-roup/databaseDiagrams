'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "microsoft" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('extension.getDatabases', async () => {
        // The code you place here will be executed every time your command is executed
        
        // Open connection dialog
        const connection = await azdata.connection.openConnectionDialog();
        const uri = connection.connectionId;        
        // Call for databases with extra information
        // Look for getTables, getColumns etc in the same class aka metadataProvider
        // const databases = await metadataProvider.getDatabases(uri);
        // const metadataProvider = azdata.dataprotocol.getProvider<azdata.MetadataProvider>(connection.providerName, 
        //     azdata.DataProviderType.MetadataProvider);
        const databaseNames = await azdata.connection.listDatabases(uri);

        
        // Display a message box to the user
        vscode.window.showQuickPick(databaseNames);
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
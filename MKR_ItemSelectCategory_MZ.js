//=============================================================================
// MKR_ItemSelectCategory_MZ.js
//=============================================================================
// Copyright (c) 2021 マンカインド
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.2.0 2024/02/06 ・表示するアイテムの対象として
//                    武器/防具のタイプを指定できるように改修。
//
// 2.1.0 2021/12/30 ・RPGツクールMZのプラグインコマンド方式に対応
//
// 2.0.0 2021/04/26 ・RPGツクールMZに対応。
//                  ・コードをリファクタリング
//
// 1.0.1 2017/12/10 ・アイテムメニューのカテゴリ設定を追加。
//
// 1.0.0 2017/10/25 ・初版公開。
// ----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//=============================================================================

/*:
 * ============================================================================
 * @plugindesc (v2.2.0) アイテム選択カテゴリ設定プラグイン
 * @author マンカインド
 * @url https://raw.githubusercontent.com/mankindGames/RPGTkoolMZ/master/MKR_ItemSelectCategory_MZ.js
 *
 * @target MZ
 *
 * @help = アイテム選択カテゴリ設定プラグイン =
 * MKR_ItemSelectCategory_MZ.js
 *
 *
 * [アイテム選択の処理]イベントコマンドで"武器"や"防具"を選択可能にします。
 * 選択後、選択したカテゴリに属するアイテムのIDが指定した変数へと格納されます。
 *
 * 本プラグインで使用可能なプラグインコマンドは下記の通りです。
 *
 * [カテゴリ変更]
 *   ・アイテム選択の処理で選択可能なアイテムのカテゴリを変更します。
 *   ・引数
 *       カテゴリ:
 *         "武器"     : カテゴリを"武器"に変更します。
 *         "防具"     : カテゴリを"防具"に変更します。
 *         "アイテム" : カテゴリを"アイテム"に設定します。(元々のカテゴリ)
 *
 *       タイプ1:
 *         カテゴリが"武器"、又は"防具"を選択時のみ効果を発揮します。
 *         カテゴリが"武器"の場合は、更に表示する"武器タイプ"を選択できます。
 *         カテゴリが"防具"の場合は、更に表示する"防具タイプ"を選択できます。
 *         0 を指定した場合は全て対象とします。
 *
 *       タイプ2:
 *         カテゴリ"防具"を選択時のみ効果を発揮します。
 *         更に表示する"装備タイプ"を選択できます。
 *         0 を指定した場合は全て対象とします。
 *
 * ○○タイプは、ツクールエディターの[データベース]画面左の[タイプ]を
 * 選択することで確認・設定できます。
 *
 * アイテム選択ウィンドウが閉じられると、アイテムカテゴリは
 * プラグインパラメータ[初期アイテムカテゴリ]で選択したものに
 * 変更されます。
 *
 *
 * スクリプトコマンド:
 *   ありません。
 *
 *
 * 【利用規約】
 *   ・作者に無断で本プラグインの改変、再配布が可能です。
 *     (ただしヘッダーの著作権表示部分は残してください。)
 *
 *   ・利用形態(フリーゲーム、商用ゲーム、R-18作品等)に制限はありません。
 *     ご自由にお使いください。
 *
 *   ・本プラグインを使用したことにより発生した問題について作者は一切の責任を
 *     負いません。
 *
 *   ・要望などがある場合、本プラグインのバージョンアップを行う
 *     可能性がありますが、
 *     バージョンアップにより本プラグインの仕様が変更される可能性があります。
 *     ご了承ください。
 *
 * ============================================================================
 *
 * @param init_item_category
 * @text 初期アイテムカテゴリ
 * @desc 初期状態でアイテム選択ウィンドウに表示されるアイテムのカテゴリを設定します。(デフォルト:アイテム)
 * @type select
 * @option アイテム
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @default item
 *
 * @param item_menu_category
 * @text アイテムメニューカテゴリ
 * @desc アイテムメニューを開いたときに選択されているアイテムのカテゴリを設定します。(デフォルト:アイテム)
 * @type select
 * @option アイテム
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @option 大事なもの
 * @value keyItem
 * @default item
 *
 *
 * @command category_change
 * @text カテゴリ変更
 * @desc 「アイテム選択の処理」で選択可能なアイテムのカテゴリを変更します。
 *
 * @arg category
 * @text カテゴリ
 * @desc アイテムのカテゴリです。
 * @default item
 * @type select
 * @option アイテム
 *      @value item
 * @option 武器
 *      @value weapon
 * @option 防具
 *      @value armor
 *
 * @arg type1
 * @text タイプ1
 * @desc 武器の"武器タイプ"番号、又は防具の"防具タイプ"番号を設定します。0の場合は全て対象となります。
 * @default 0
 * @type number
 * @min 0
 * @decimals 0
 *
 * @arg type2
 * @text タイプ2
 * @desc 防具の"装備タイプ"番号を設定します。0の場合は全て対象となります。
 * @default 0
 * @type number
 * @min 0
 * @decimals 0
 *
*/

(() => {
    'use strict';

    //=========================================================================
    // Parameter
    //  ・プラグインパラメータの取得と加工
    //
    //=========================================================================
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameter = PluginManager.parameters(pluginName);

    const settings = {
        initItemCategory: String(pluginParameter["init_item_category"]).trim(),
        itemMenuCategory: String(pluginParameter["item_menu_category"]).trim(),
    };


    //=========================================================================
    // PluginManager
    //  ・アイテムカテゴリ設定用コマンドを定義します。
    //
    //=========================================================================
    PluginManager.registerCommand(pluginName, "category_change", args => {
        $gameMessage.setItemChoiceCategory(args.category);
        $gameMessage.setItemChoiceType1(parseInt(args.type1));
        $gameMessage.setItemChoiceType2(parseInt(args.type2));
    });


    //=========================================================================
    // Game_Message
    //  ・アイテム選択ウィンドウに関する変数を定義します。
    //
    //=========================================================================
    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.call(this);
        this.setItemChoiceCategory(settings.initItemCategory);
        this.setItemChoiceType1(0);
        this.setItemChoiceType2(0);
    };

    Game_Message.prototype.itemChoiceCategory = function() {
        return this._itemChoiceCategory;
    };

    Game_Message.prototype.setItemChoiceCategory = function(category) {
        this._itemChoiceCategory = category;
    };

    Game_Message.prototype.itemChoiceType1 = function() {
        return this._itemChoiceType1;
    };

    Game_Message.prototype.setItemChoiceType1 = function(type) {
        this._itemChoiceType1 = type;
    };

    Game_Message.prototype.itemChoiceType2 = function() {
        return this._itemChoiceType2;
    };

    Game_Message.prototype.setItemChoiceType2 = function(type) {
        this._itemChoiceType2 = type;
    };

    //=========================================================================
    // Window_EventItem
    //  ・アイテム選択ウィンドウの項目を再定義します。
    //
    //=========================================================================
    const _Window_EventItem_includes = Window_EventItem.prototype.includes;
    Window_EventItem.prototype.includes = function(item) {
        let result = true;
        switch($gameMessage.itemChoiceCategory()) {
            case 'armor': {
                if(!DataManager.isArmor(item)) {
                    return false;
                }

                const type1 = $gameMessage.itemChoiceType1();
                const type2 = $gameMessage.itemChoiceType2();

                if(result && type1) {
                    result = item.atypeId === type1;
                }
                if(result && type2) {
                    result = item.etypeId === type2;
                }

                return result;
            }
            case 'weapon': {
                if(!DataManager.isWeapon(item)) {
                    return false;
                }

                const type1 = $gameMessage.itemChoiceType1();

                if(result && type1) {
                    result = item.wtypeId === type1;
                }

                return result;
            }
            default: {
                return _Window_EventItem_includes.call(this, item);
            }
        }
    };


    //=========================================================================
    // Window_ItemCategory
    //  ・アイテムメニューのカテゴリウィンドウの項目を再定義します。
    //
    //=========================================================================
    const _Window_ItemCategory_initialize = Window_ItemCategory.prototype.initialize;
    Window_ItemCategory.prototype.initialize = function(rect) {
        _Window_ItemCategory_initialize.call(this, rect);
        this.selectSymbol(settings.itemMenuCategory);
    };

})();
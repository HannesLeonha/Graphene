//=============================================================================
// SkillsNGuilt
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds a new skills and guilt system
 * @url https://github.com/HannesLeonha
 * @author Hannes Leonhartsberger
 *
 * @help -- SkillsNGuilt --
 *
 * ---------------------------------- Guilt ----------------------------------
 * Adds a new guilt point system which can be interacted with through
 * commands. Is a value clamped between 0 and 100.
 *
 * ---------------------------------- Skills ---------------------------------
 * Adds a new skill system with attribute leveling and skill points which can
 * be spent on new special skills.
 *
 * @command ChangeGuilt
 * @text Change guilt
 * @desc Changes the guilt meter
 *
 * @arg amount
 * @text Guilt Amount
 * @desc The amount of guilt to be added (can be negative)
 * @type number
 */

(() => {
  const pluginName = "SkillsNGuilt";

  // Add guilt meter to save system
  {
    const _makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
      let info = _makeSavefileInfo.apply(this, arguments);
      info.guilt = $gameSystem.guilt;

      return info;
    }

    const _initialize_Game_System = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
      _initialize_Game_System.apply(this, arguments);

      this.guilt = 0;
    }
  }

  // Add change guilt command
  {
    Game_System.prototype.guiltChanged = ()=>{}

    PluginManager.registerCommand(pluginName, "ChangeGuilt", args => {
      if(isNaN(args.amount)) return;

      $gameSystem.guilt += +args.amount;
      Game_System.prototype.guiltChanged();
    });
  }
})();
